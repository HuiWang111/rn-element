import React, { Children, cloneElement, useRef } from 'react';
import { TextInput, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { useArrowDown, useArrowUp } from '../../hooks';
import { useMemo } from 'react';
import { ListItem, ActivableListItem } from './ListItem';
import { mergeStyle } from '../../utils';
import { ListContext } from './context';
function isActivableListItem(c) {
    return [ActivableListItem, ListItem].includes(c.type);
}
function mapChildrenWithFindListItem(c, listProps) {
    var _a;
    if (!c)
        return null;
    if (isActivableListItem(c)) {
        const { activeIndex, itemStyle, inputComponent, index, onChange } = listProps;
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
    const children = (_a = c.props) === null || _a === void 0 ? void 0 : _a.children;
    return children
        ? cloneElement(c, {}, Children.map(children, (child) => {
            return mapChildrenWithFindListItem(child, listProps);
        }))
        : c;
}
function mapChildrenIsActivable(c) {
    if (c.type === ActivableListItem) {
        return true;
    }
    if (!c.props.children) {
        return false;
    }
    return Children.toArray(c.props.children).some((child) => mapChildrenIsActivable(child));
}
const ActivableList = ({ activeIndex = 0, loop = true, children, keyboard = true, style, activeItemStyle, itemStyle, inputComponent = TextInput, onChange }) => {
    const isActivableList = Children.toArray(children).map((child) => mapChildrenIsActivable(child));
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
        React.createElement(ListContext.Provider, { value: { onChange, activeItemStyle, keyboard } }, Children.map(children, (child, index) => {
            return mapChildrenWithFindListItem(child, {
                activeIndex,
                inputComponent,
                index,
                itemStyle,
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
