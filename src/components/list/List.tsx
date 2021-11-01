import React, { FC, PropsWithChildren, Children, cloneElement, ReactElement, useRef } from 'react';
import { TextInput, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { IListProps, IParentProps } from './interface';
import { useArrowDown, useArrowUp } from '../../hooks';
import { useMemo } from 'react';
import { ListItem, ActivableListItem } from './ListItem';
import { mergeStyle } from '../../utils';
import { ListContext } from './context';

function isActivableListItem(c: ReactElement) {
    return [ActivableListItem, ListItem].includes(c.type as never);
}

function mapChildrenWithFindListItem(c: ReactElement, listProps: IParentProps) {
    if (!c) return null;

    if (isActivableListItem(c)) {
        const {
            activeIndex,
            itemStyle,
            inputComponent,
            index,
            onChange
        } = listProps;
        const childItemStyle = c.props.style;
        const childInputComponent = c.props.inputComponent;
        
        return cloneElement(c, {
            isActive: activeIndex === index,
            style: mergeStyle(itemStyle, childItemStyle),
            inputComponent: childInputComponent
                ? childInputComponent
                : inputComponent,
            index,
            onChange
        });
    }

    const children = c.props?.children;
    
    return children
        ? cloneElement(c, {}, Children.map(children, (child) => {
            return mapChildrenWithFindListItem(child, listProps);
        }))
        : c;
}

function mapChildrenIsActivable(c: ReactElement) {
    if (c.type === ActivableListItem) {
        return true;
    }
    
    if (!c.props?.children) {
        return false;
    }

    return Children.toArray(c.props.children).some((child: ReactElement) => mapChildrenIsActivable(child));
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
    const isActivableList: boolean[] = Children.toArray(children).map((child: ReactElement) => mapChildrenIsActivable(child));

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
            <ListContext.Provider value={{ onChange, activeItemStyle, keyboard }}>
                {
                    Children.map(children, (child: ReactElement, index: number) => {
                        
                        return mapChildrenWithFindListItem(child, {
                            activeIndex,
                            inputComponent,
                            index,
                            itemStyle,
                            onChange
                        })
                    })
                }
            </ListContext.Provider>
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
