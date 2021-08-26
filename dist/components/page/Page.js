import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import { KeyCode } from '../../constants';
import { useKeyUp } from '../../hooks';
import { isFunction } from '../../utils';
export const Page = ({ F1, F2, F3, F4, mockFn = true, keyborad = true, mockFnKeyMap = {
    F1: KeyCode.Z,
    F2: KeyCode.X,
    F3: KeyCode.C,
    F4: KeyCode.V
}, header, headerStyle, style, FnStyle, children }) => {
    const { width, height } = useWindowDimensions();
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
        restHeight -= 50;
    }
    const handlePressF1 = () => {
        var _a, _b;
        if (F1.disabled)
            return;
        (_b = (_a = F1).handler) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const handlePressF2 = () => {
        var _a, _b;
        if (F2.disabled)
            return;
        (_b = (_a = F2).handler) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const handlePressF3 = () => {
        var _a, _b;
        if (F3.disabled)
            return;
        (_b = (_a = F3).handler) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const handlePressF4 = () => {
        var _a, _b;
        if (F4.disabled)
            return;
        (_b = (_a = F4).handler) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    return (React.createElement(View, { style: [{ width, height, display: 'flex' }, style] },
        header
            ? React.createElement(View, { style: [{ width }, styles.header, headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.container] },
                React.createElement(View, { style: [styles.headerLeft, headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.left] }, header.left),
                React.createElement(View, { style: [styles.headerCenter, headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.center] }, header.center),
                React.createElement(View, { style: [styles.headerRight, headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.right] }, header.right))
            : null,
        isFunction(children)
            ? children({ width, height: restHeight })
            : children,
        displayFnBar
            ? React.createElement(View, { style: [{ width }, styles.fnBar, FnStyle === null || FnStyle === void 0 ? void 0 : FnStyle.bar] },
                F1
                    ? React.createElement(Pressable, { style: [{ width: width / 4 }, styles.fnCol, FnStyle === null || FnStyle === void 0 ? void 0 : FnStyle.col], onPress: handlePressF1 }, F1.label)
                    : null,
                F2
                    ? React.createElement(Pressable, { style: [{ width: width / 4 }, styles.fnCol, FnStyle === null || FnStyle === void 0 ? void 0 : FnStyle.col], onPress: handlePressF2 }, F2.label)
                    : null,
                F3
                    ? React.createElement(Pressable, { style: [{ width: width / 4 }, styles.fnCol, FnStyle === null || FnStyle === void 0 ? void 0 : FnStyle.col], onPress: handlePressF3 }, F3.label)
                    : null,
                F4
                    ? React.createElement(Pressable, { style: [{ width: width / 4 }, styles.fnCol, FnStyle === null || FnStyle === void 0 ? void 0 : FnStyle.col], onPress: handlePressF4 }, F4.label)
                    : null)
            : null));
};
Page.displayName = 'Page';
Page.propTypes = {
    mockFn: PropTypes.bool,
    keyborad: PropTypes.bool
};
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        flexBasis: 50,
    },
    headerLeft: {
        flexBasis: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
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
        flexBasis: 50
    },
    fnCol: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
