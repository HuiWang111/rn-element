import React, { FC, PropsWithChildren, Children, cloneElement, ReactElement, ReactNode, useRef } from 'react';
import { TextInput, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { IListProps } from './interface';
import { useArrowDown, useArrowUp } from '../../hooks';
import { useMemo } from 'react';
import { ListItem, ActivableListItem } from './ListItem';
import { mergeStyle } from '../../utils';

const isActivableListItem = (c: ReactElement) => {
    return [ActivableListItem, ListItem].includes(c.type as never);
}

const ActivableList: FC<PropsWithChildren<IListProps>> = ({
    activeIndex = 0,
    loop = true,
    children,
    keyboard = true,
    style,
    activeItemStyle,
    itemStyle,
    inputComponent = TextInput,
    onChange
}: PropsWithChildren<IListProps>): JSX.Element => {
    /**
     * map children是否可以被选中
     */
    const isActivableList: boolean[] = Children.toArray(children).map(child => {
        if (
            !child ||
            !(child as ReactElement).type ||
            !isActivableListItem(child as ReactElement)
        ) {
            throw new Error('[ActiveList] children must be List.ActivableListItem or List.Item');
        }
        
        return (child as ReactElement).type === ActivableListItem;
    });

    const isAllInactivable = !(isActivableList.some(bool => bool === true));
    
    /**
     * 第一个和最后一个可选中的index，用于loop为true做循环的判断
     */
    const [firstActivableIndex, lastActivableIndex] = useMemo(() => {
        return isAllInactivable
            ? [-1, -1]
            : [isActivableList.indexOf(true), isActivableList.lastIndexOf(true)];
    }, [isActivableList, isAllInactivable]);

    const scrollViewRef = useRef<ScrollView | null>(null);
    
    useArrowUp(() => {
        if (!keyboard || isAllInactivable || !onChange) return;

        if (activeIndex > firstActivableIndex) {
            onChange(isActivableList.lastIndexOf(true, activeIndex - 1));
        } else if (loop) {
            scrollViewRef.current?.scrollToEnd({ animated: true });
            onChange(lastActivableIndex);
        }
    }, [activeIndex, keyboard, isAllInactivable]);

    useArrowDown(() => {
        if (!keyboard || isAllInactivable || !onChange) return;

        if (activeIndex < lastActivableIndex) {
            onChange(isActivableList.indexOf(true, activeIndex + 1));
        } else if (loop) {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            onChange(firstActivableIndex);
        }
    }, [activeIndex, keyboard, isAllInactivable]);
    
    return (
        <ScrollView style={style} ref={scrollViewRef}>
            {
                Children.map(children, (child: ReactNode, index: number) => {
                    const c = child as ReactElement;
                    const childItemStyle = c.props.style;
                    const childActiveItemStyle = c.props.activeStyle;
                    const childInputComponent = c.props.inputComponent;
                    
                    return cloneElement(c, {
                        isActive: activeIndex === index,
                        style: mergeStyle(itemStyle, childItemStyle),
                        activeStyle: mergeStyle(activeItemStyle, childActiveItemStyle),
                        inputComponent: childInputComponent
                            ? childInputComponent
                            : inputComponent,
                        index,
                        onChange
                    });
                })
            }
        </ScrollView>
    );
}

ActivableList.propTypes = {
    activeIndex: PropTypes.number,
    loop: PropTypes.bool,
    onChange: PropTypes.func
};

ActivableList.displayName = 'ActivableList';

export default ActivableList;
