import React, { Children, cloneElement } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useKeyEvents } from '../hooks';
import { KeyCode } from '../constants';
import { useMemo } from 'react';
import { ListItem, ActivableListItem } from './ListItem';
import { mergeStyle } from '../utils';
const UpDownKeyCodes = [KeyCode.Up, KeyCode.Down];
const isActiveListItem = (c) => {
    return [ActivableListItem, ListItem].includes(c.type);
};
const ActiveList = ({ activeIndex, loop = true, children, onChange, style, activeItemStyle, itemStyle }) => {
    const isActivableList = Children.toArray(children).map(child => {
        const typeofChild = typeof child;
        if (!child ||
            typeofChild === 'number' || typeofChild === 'string' || typeofChild === 'boolean' ||
            !child.type ||
            !isActiveListItem(child)) {
            throw new Error('[ActiveList] children must be List.ActiveListItem or List.Item');
        }
        return child.type === ActivableListItem;
    });
    const [firstActivableIndex, lastActivableIndex] = useMemo(() => {
        return [isActivableList.indexOf(true), isActivableList.lastIndexOf(true)];
    }, [isActivableList]);
    useKeyEvents('keyup', (event) => {
        if (!UpDownKeyCodes.includes(event.which) || !onChange)
            return;
        if (event.which === KeyCode.Up) {
            if (activeIndex > firstActivableIndex) {
                onChange(isActivableList.lastIndexOf(true, activeIndex - 1));
            }
            else if (loop) {
                onChange(lastActivableIndex);
            }
        }
        else {
            if (activeIndex < lastActivableIndex) {
                onChange(isActivableList.indexOf(true, activeIndex + 1));
            }
            else if (loop) {
                onChange(firstActivableIndex);
            }
        }
    }, [activeIndex]);
    return (React.createElement(View, { style: style }, Children.map(children, (child, index) => {
        const c = child;
        const childItemStyle = c.props.style;
        const childActiveItemStyle = c.props.activeStyle;
        return cloneElement(c, {
            isActive: activeIndex === index,
            style: mergeStyle(itemStyle, childItemStyle),
            activeStyle: mergeStyle(activeItemStyle, childActiveItemStyle)
        });
    })));
};
ActiveList.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    loop: PropTypes.bool,
    onChange: PropTypes.func
};
ActiveList.displayName = 'ActiveList';
export default ActiveList;
