import React, { Children, cloneElement, useRef } from 'react';
import { TextInput, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { useArrowDown, useArrowUp } from '../../hooks';
import { useMemo } from 'react';
import { ListItem, ActivableListItem } from './ListItem';
import { mergeStyle } from '../../utils';
import { ListContext } from './context';
const isActivableListItem = (c) => {
    return [ActivableListItem, ListItem].includes(c.type);
};
const ActivableList = ({ activeIndex = 0, loop = true, children, keyboard = true, style, activeItemStyle, itemStyle, inputComponent = TextInput, onChange }) => {
    const isActivableList = Children.toArray(children).map(child => {
        if (!child ||
            !child.type ||
            !isActivableListItem(child)) {
            throw new Error('[ActiveList] children must be List.ActivableListItem or List.Item');
        }
        return child.type === ActivableListItem;
    });
    const isAllInactivable = !(isActivableList.some(bool => bool === true));
    const [firstActivableIndex, lastActivableIndex] = useMemo(() => {
        return isAllInactivable
            ? [-1, -1]
            : [isActivableList.indexOf(true), isActivableList.lastIndexOf(true)];
    }, [isActivableList, isAllInactivable]);
    const scrollViewRef = useRef(null);
    useArrowUp(() => {
        var _a;
        if (!keyboard || isAllInactivable || !onChange)
            return;
        if (activeIndex > firstActivableIndex) {
            onChange(isActivableList.lastIndexOf(true, activeIndex - 1));
        }
        else if (loop) {
            (_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollToEnd({ animated: true });
            onChange(lastActivableIndex);
        }
    }, [activeIndex, keyboard, isAllInactivable]);
    useArrowDown(() => {
        var _a;
        if (!keyboard || isAllInactivable || !onChange)
            return;
        if (activeIndex < lastActivableIndex) {
            onChange(isActivableList.indexOf(true, activeIndex + 1));
        }
        else if (loop) {
            (_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ y: 0, animated: true });
            onChange(firstActivableIndex);
        }
    }, [activeIndex, keyboard, isAllInactivable]);
    return (React.createElement(ScrollView, { style: style, ref: scrollViewRef },
        React.createElement(ListContext.Provider, { value: { onChange } }, Children.map(children, (child, index) => {
            const c = child;
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
                keyboard,
                onChange
            });
        }))));
};
ActivableList.propTypes = {
    activeIndex: PropTypes.number,
    loop: PropTypes.bool,
    onChange: PropTypes.func
};
ActivableList.displayName = 'ActivableList';
export default ActivableList;
