var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useRef, useContext } from 'react';
import { Pressable, View } from 'react-native';
import { mapChildrenWithRef } from './utils';
import { useKeyUp, useConfig } from '../../hooks';
import { KeyCode } from '../../constants';
import PropTypes from 'prop-types';
import { isFunction } from '../../utils';
import { ListContext } from './context';
const InternalListItem = ({ isActive, style, children, autoFocus, inputComponent, isActivable, index, onPress, onEnter }) => {
    const inputRef = useRef(null);
    const isTabEnter = useRef(false);
    const { showSoftInputOnFocus } = useConfig();
    const { onChange, activeItemStyle, keyboard } = useContext(ListContext);
    const handlePress = (e) => {
        if (!isTabEnter.current) {
            onChange === null || onChange === void 0 ? void 0 : onChange(index);
            onPress === null || onPress === void 0 ? void 0 : onPress(e);
        }
        else {
            isTabEnter.current = false;
        }
    };
    const handleFocus = (e, inputProps) => {
        var _a;
        if (!isActive) {
            onChange === null || onChange === void 0 ? void 0 : onChange(index);
        }
        (_a = inputProps.onFocus) === null || _a === void 0 ? void 0 : _a.call(inputProps, e);
    };
    useEffect(() => {
        var _a, _b;
        if (autoFocus) {
            if (isActive) {
                if (((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.isFocused()) === false) {
                    inputRef.current.focus();
                }
            }
            else {
                if ((_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.isFocused()) {
                    inputRef.current.blur();
                }
            }
        }
    }, [autoFocus, isActive]);
    useKeyUp((e) => {
        if (e.which === KeyCode.Enter) {
            isTabEnter.current = true;
            if (isActive && keyboard) {
                onEnter === null || onEnter === void 0 ? void 0 : onEnter();
            }
        }
        else {
            isTabEnter.current = false;
        }
    }, [isActive]);
    const child = isFunction(children) ? children({ isActive }) : children;
    return isActivable ? (React.createElement(Pressable, { style: [style, isActive ? activeItemStyle : null], onPress: handlePress }, autoFocus
        ? mapChildrenWithRef(child, inputRef, inputComponent, {
            showSoftInputOnFocus
        }, handleFocus)
        : child)) : (React.createElement(View, { style: style }, child));
};
InternalListItem.propTypes = {
    isActive: PropTypes.bool,
    autoFocus: PropTypes.bool,
    isActivable: PropTypes.bool.isRequired
};
export const ListItem = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement(InternalListItem, Object.assign({}, props, { isActivable: false }), children));
};
ListItem.displayName = 'ListItem';
export const ActivableListItem = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement(InternalListItem, Object.assign({}, props, { isActivable: true }), children));
};
ActivableListItem.displayName = 'ActivableListItem';
