import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Dimensions } from 'react-native';
import { RootSiblingPortal } from 'react-native-root-siblings';
import PropTypes from 'prop-types';
import { isUndefined, isString, isFunction, isNull } from '../../utils';
import { Button } from '../button';
import { useTheme, useConfig } from '../../hooks';
import { Mask } from '../base';
const screenWidth = Dimensions.get('window').width;
export const Modal = ({ title, footer, zIndex: propsZIndex, okText = '确定', cancelText = '取消', titleStyle, bodyStyle, footerStyle, onOk, onCancel, children, visible = false, onVisibleChange }) => {
    const { width } = useWindowDimensions();
    const colors = useTheme();
    const { modalZIndex } = useConfig();
    const zIndex = propsZIndex !== null && propsZIndex !== void 0 ? propsZIndex : modalZIndex;
    const commonStyle = {
        width: width - 80
    };
    const getFooter = (footer) => {
        if (isUndefined(footer)) {
            return (React.createElement(React.Fragment, null,
                React.createElement(View, { style: styles.okBtnWrap },
                    React.createElement(Button, { type: 'primary', title: okText, onPress: () => { onOk === null || onOk === void 0 ? void 0 : onOk(); } })),
                React.createElement(View, { style: styles.cancalBtnWrap },
                    React.createElement(Button, { title: cancelText, onPress: () => { onCancel === null || onCancel === void 0 ? void 0 : onCancel(); } }))));
        }
        if (isFunction(footer)) {
            return footer({
                okText,
                cancelText,
                onOk,
                onCancel
            });
        }
        return footer;
    };
    useEffect(() => {
        onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(visible);
    }, [visible, onVisibleChange]);
    return (React.createElement(RootSiblingPortal, null,
        React.createElement(Mask, { zIndex: zIndex, visible: visible },
            React.createElement(View, { style: styles.centeredView },
                React.createElement(View, { style: styles.modalView },
                    title
                        ? (React.createElement(View, { style: [
                                styles.title,
                                { borderBottomColor: colors.border },
                                commonStyle,
                                titleStyle
                            ] }, isString(title)
                            ? React.createElement(Text, { style: { fontSize: 18, fontWeight: 'bold' } }, title)
                            : title))
                        : null,
                    children
                        ? (React.createElement(View, { style: [styles.body, commonStyle, bodyStyle] }, children))
                        : null,
                    isNull(footer)
                        ? null
                        : (React.createElement(View, { style: [styles.footer, commonStyle, footerStyle] }, getFooter(footer))))))));
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        width: screenWidth - 40,
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
        borderBottomWidth: 1
    },
    body: {
        paddingVertical: 20
    },
    footer: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    okBtnWrap: {
        flex: 1
    },
    cancalBtnWrap: {
        flex: 1,
        marginLeft: 10
    }
});
Modal.displayName = 'Modal';
Modal.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    zIndex: PropTypes.number,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    onVisibleChange: PropTypes.func
};
