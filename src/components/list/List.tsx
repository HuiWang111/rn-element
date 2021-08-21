import React, { FC, PropsWithChildren, Children, cloneElement, ReactElement, ReactNode, useRef, useState } from 'react';
import { TextInput, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { IListProps } from './interface';
import { useKeyEvents } from '../../hooks';
import { KeyCode } from '../../constants';
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
    onChange,
    onEnter
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
    
    /**
     * 第一个和最后一个可选中的index，用于loop为true做循环的判断
     */
    const [firstActivableIndex, lastActivableIndex] = useMemo(() => {
        return [isActivableList.indexOf(true), isActivableList.lastIndexOf(true)];
    }, [isActivableList]);

    const scrollViewRef = useRef<ScrollView | null>(null);

    /**
     * 由于键盘Enter同时也会触发安卓默认焦点元素的onPress事件
     * 因此此处做一个标记，当按下Enter键时标记为true
     * 用这个标记来阻止List.Item的onPress事件
     */
    const [isTabEnter, setIsTabEnter] = useState(false);
    
    useKeyEvents('keyup', (event): void => {
        if (!keyboard) return;
        
        if (event.which === KeyCode.Up) {
            setIsTabEnter(false);
            if (!onChange) return;

            if (activeIndex > firstActivableIndex) {
                onChange(isActivableList.lastIndexOf(true, activeIndex - 1));
            } else if (loop) {
                scrollViewRef.current?.scrollToEnd({ animated: true });
                onChange(lastActivableIndex);
            }
        } else if (event.which === KeyCode.Down) {
            setIsTabEnter(false);
            if (!onChange) return;

            if (activeIndex < lastActivableIndex) {
                onChange(isActivableList.indexOf(true, activeIndex + 1));
            } else if (loop) {
                scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                onChange(firstActivableIndex);
            }
        } else if (event.which === KeyCode.Enter) {
            setIsTabEnter(true);
            if (!onEnter) return;

            onEnter();
        } else {
            setIsTabEnter(false);
        }
    }, [activeIndex, keyboard]);
    
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
                        isTabEnter,
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
