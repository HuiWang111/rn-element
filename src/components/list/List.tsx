import React, { FC, PropsWithChildren, Children, cloneElement, ReactElement, ReactNode, useRef } from 'react';
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
    onChange,
    onEnter,
    style,
    activeItemStyle,
    itemStyle,
    inputComponent = TextInput
}: PropsWithChildren<IListProps>): JSX.Element => {
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
    const [firstActivableIndex, lastActivableIndex] = useMemo(() => {
        return [isActivableList.indexOf(true), isActivableList.lastIndexOf(true)];
    }, [isActivableList]);
    const scrollViewRef = useRef<ScrollView | null>(null);
    
    useKeyEvents('keyup', (event): void => {
        if (!keyboard) return;
        
        if (event.which === KeyCode.Up) {
            if (!onChange) return;

            if (activeIndex > firstActivableIndex) {
                onChange(isActivableList.lastIndexOf(true, activeIndex - 1));
            } else if (loop) {
                scrollViewRef.current?.scrollToEnd({ animated: true });
                onChange(lastActivableIndex);
            }
        } else if (event.which === KeyCode.Down) {
            if (!onChange) return;

            if (activeIndex < lastActivableIndex) {
                onChange(isActivableList.indexOf(true, activeIndex + 1));
            } else if (loop) {
                scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
                onChange(firstActivableIndex);
            }
        } else if (event.which === KeyCode.Enter) {
            if (!onEnter) return;

            onEnter();
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
                            : inputComponent
                    });
                })
            }
        </ScrollView>
    );
}

ActivableList.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    loop: PropTypes.bool,
    onChange: PropTypes.func
};

ActivableList.displayName = 'ActivableList';

export default ActivableList;
