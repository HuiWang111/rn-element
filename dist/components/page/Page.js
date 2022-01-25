import React, { useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { KeyCode } from '../../constants';
import { useKeyUp, useTheme } from '../../hooks';
import { isFunction, isString, isUndefined } from '../../utils';
export const Page = ({ Component = View, componentProps, F1, F2, F3, F4, mockFn = true, keyborad = true, mockFnKeyMap = {
    F1: KeyCode.Z,
    F2: KeyCode.X,
    F3: KeyCode.C,
    F4: KeyCode.V
}, header, headerStyle, style, fnStyle, children }) => {
    const { width, height } = useWindowDimensions();
    const { page } = useTheme();
    const headerTextStyle = {
        color: page === null || page === void 0 ? void 0 : page.headerTextColor,
        fontSize: page === null || page === void 0 ? void 0 : page.headerTextSize
    };
    const bottomTextStyle = {
        color: page === null || page === void 0 ? void 0 : page.bottomTextColor,
        fontSize: page === null || page === void 0 ? void 0 : page.bottomTextSize
    };
    const quarter = width / 4;
    const F1KeyCodes = useMemo(() => {
        if (!mockFn || !keyborad)
            return [KeyCode.F1];
        return mockFnKeyMap.F1 ? [KeyCode.F1].concat(mockFnKeyMap.F1) : [KeyCode.F1];
    }, [mockFn, keyborad, mockFnKeyMap.F1]);
    const F2KeyCodes = useMemo(() => {
        if (!mockFn || !keyborad)
            return [KeyCode.F2];
        return mockFnKeyMap.F2 ? [KeyCode.F2].concat(mockFnKeyMap.F2) : [KeyCode.F1];
    }, [mockFn, keyborad, mockFnKeyMap.F2]);
    const F3KeyCodes = useMemo(() => {
        if (!mockFn || !keyborad)
            return [KeyCode.F3];
        return mockFnKeyMap.F3 ? [KeyCode.F3].concat(mockFnKeyMap.F3) : [KeyCode.F3];
    }, [mockFn, keyborad, mockFnKeyMap.F3]);
    const F4KeyCodes = useMemo(() => {
        if (!mockFn || !keyborad)
            return [KeyCode.F4];
        return mockFnKeyMap.F4 ? [KeyCode.F4].concat(mockFnKeyMap.F4) : [KeyCode.F4];
    }, [mockFn, keyborad, mockFnKeyMap]);
    useKeyUp((event) => {
        if ((F1 === null || F1 === void 0 ? void 0 : F1.handler) && F1KeyCodes.includes(event.which)) {
            F1.handler();
        }
        else if ((F2 === null || F2 === void 0 ? void 0 : F2.handler) && F2KeyCodes.includes(event.which)) {
            F2.handler();
        }
        else if ((F3 === null || F3 === void 0 ? void 0 : F3.handler) && F3KeyCodes.includes(event.which)) {
            F3.handler();
        }
        else if ((F4 === null || F4 === void 0 ? void 0 : F4.handler) && F4KeyCodes.includes(event.which)) {
            F4.handler();
        }
    }, [F1 === null || F1 === void 0 ? void 0 : F1.handler, F2 === null || F2 === void 0 ? void 0 : F2.handler, F3 === null || F3 === void 0 ? void 0 : F3.handler, F4 === null || F4 === void 0 ? void 0 : F4.handler]);
    let restHeight = height;
    if (header) {
        restHeight -= 50;
    }
    const displayFnBar = Boolean(F1 || F2 || F3 || F4);
    if (displayFnBar) {
        restHeight -= 40;
    }
    const handlePressFn = (fn) => {
        var _a;
        if (fn.disabled) {
            return;
        }
        (_a = fn.handler) === null || _a === void 0 ? void 0 : _a.call(fn);
    };
    return (React.createElement(Component, Object.assign({}, componentProps, { style: [{ width, height, display: 'flex' }, style] }),
        header
            ? (React.createElement(View, { style: [
                    {
                        width,
                        backgroundColor: page === null || page === void 0 ? void 0 : page.headerBackgroundColor
                    },
                    styles.header,
                    headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.container
                ] },
                header.left ? (React.createElement(View, { style: [styles.headerLeft, headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.left] }, isString(header.left)
                    ? React.createElement(Text, { style: headerTextStyle }, header.left)
                    : header.left)) : null,
                header.center ? (React.createElement(View, { style: [styles.headerCenter, headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.center] }, isString(header.center)
                    ? React.createElement(Text, { style: headerTextStyle }, header.center)
                    : header.center)) : null,
                header.right ? (React.createElement(View, { style: [styles.headerRight, headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.right] }, isString(header.right)
                    ? React.createElement(Text, { style: headerTextStyle }, header.right)
                    : header.right)) : null))
            : null,
        isFunction(children)
            ? children({ width, height: restHeight - 25 })
            : children,
        displayFnBar
            ? (React.createElement(View, { style: [
                    {
                        width,
                        backgroundColor: page === null || page === void 0 ? void 0 : page.bottomBackgroundColor
                    },
                    styles.fnBar,
                    fnStyle === null || fnStyle === void 0 ? void 0 : fnStyle.bar
                ] },
                F1 && (isUndefined(F1.shouldDisplay) || F1.shouldDisplay === true)
                    ? React.createElement(TouchableOpacity, { style: [{ flexBasis: quarter }, styles.fnCol, fnStyle === null || fnStyle === void 0 ? void 0 : fnStyle.col], onPress: () => handlePressFn(F1) }, isString(F1.label)
                        ? React.createElement(Text, { style: bottomTextStyle }, F1.label)
                        : F1.label)
                    : null,
                F2 && (isUndefined(F2.shouldDisplay) || F2.shouldDisplay === true)
                    ? React.createElement(TouchableOpacity, { style: [{ flexBasis: quarter }, styles.fnCol, fnStyle === null || fnStyle === void 0 ? void 0 : fnStyle.col], onPress: () => handlePressFn(F2) }, isString(F2.label)
                        ? React.createElement(Text, { style: bottomTextStyle }, F2.label)
                        : F2.label)
                    : null,
                F3 && (isUndefined(F3.shouldDisplay) || F3.shouldDisplay === true)
                    ? React.createElement(TouchableOpacity, { style: [{ flexBasis: quarter }, styles.fnCol, fnStyle === null || fnStyle === void 0 ? void 0 : fnStyle.col], onPress: () => handlePressFn(F3) }, isString(F3.label)
                        ? React.createElement(Text, { style: bottomTextStyle }, F3.label)
                        : F3.label)
                    : null,
                F4 && (isUndefined(F4.shouldDisplay) || F4.shouldDisplay === true)
                    ? React.createElement(TouchableOpacity, { style: [{ flexBasis: quarter }, styles.fnCol, fnStyle === null || fnStyle === void 0 ? void 0 : fnStyle.col], onPress: () => handlePressFn(F4) }, isString(F4.label)
                        ? React.createElement(Text, { style: bottomTextStyle }, F4.label)
                        : F4.label)
                    : null))
            : null));
};
Page.propTypes = {
    mockFn: PropTypes.bool,
    keyborad: PropTypes.bool
};
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        flexBasis: 50,
        flexGrow: 0,
        flexShrink: 0
    },
    headerLeft: {
        flexBasis: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    headerCenter: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    headerRight: {
        flexBasis: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    fnBar: {
        flexDirection: 'row',
        flexBasis: 40,
        flexGrow: 0,
        flexShrink: 0
    },
    fnCol: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
