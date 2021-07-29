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
import React, { useEffect } from 'react';
import { Modal as ReactNativeModal, View, Text, StyleSheet, Button, useWindowDimensions } from 'react-native';
import { isString, colors, isUndefined } from '../../utils';
export const Modal = (_a) => {
    var { title, footer, zIndex, okText = '确定', cancelText = '取消', titleStyle, bodyStyle, footerStyle, onOk, onCancel, children, visible = false, onVisibleChange } = _a, restProps = __rest(_a, ["title", "footer", "zIndex", "okText", "cancelText", "titleStyle", "bodyStyle", "footerStyle", "onOk", "onCancel", "children", "visible", "onVisibleChange"]);
    const { width } = useWindowDimensions();
    const commonStyle = {
        width: width - 80
    };
    const renderWithText = (content) => {
        return isString(content)
            ? React.createElement(Text, null, content)
            : content;
    };
    const getFooter = (footer) => {
        if (isUndefined(footer)) {
            return (React.createElement(React.Fragment, null,
                React.createElement(View, { style: styles.okBtnWrap },
                    React.createElement(Button, { title: okText, onPress: () => { onOk && onOk(); } })),
                React.createElement(View, { style: styles.cancalBtnWrap },
                    React.createElement(Button, { title: cancelText, onPress: () => { onCancel && onCancel(); }, color: '#d7d7d7' }))));
        }
        return renderWithText(footer);
    };
    useEffect(() => {
        onVisibleChange && onVisibleChange(visible);
    }, [visible, onVisibleChange]);
    return (React.createElement(ReactNativeModal, Object.assign({ animationType: 'slide', transparent: true, style: {
            zIndex
        }, visible: visible }, restProps),
        React.createElement(View, { style: styles.centeredView },
            React.createElement(View, { style: styles.modalView },
                React.createElement(View, { style: [styles.title, commonStyle, titleStyle] }, renderWithText(title)),
                children
                    ? (React.createElement(View, { style: [styles.body, commonStyle, bodyStyle] }, renderWithText(children)))
                    : null,
                React.createElement(View, { style: [styles.footer, commonStyle, footerStyle] }, getFooter(footer))))));
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    body: {
        paddingVertical: 20
    },
    footer: {
        paddingVertical: 10,
        flexDirection: 'row'
    },
    okBtnWrap: {
        flex: 1
    },
    cancalBtnWrap: {
        flex: 1,
        marginLeft: 10
    }
});
