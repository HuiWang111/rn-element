import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { Modal } from './Modal';
import { omit, colors, isString } from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '../button';
let sibling = null;
const typeMapIcon = {
    confirm: 'questioncircleo',
    info: 'infocirlceo',
    error: 'closecircle',
    warning: 'exclamationcircleo',
    success: 'checkcircleo'
};
const typeMapIconColor = {
    confirm: colors.warning,
    info: colors.primary,
    error: colors.error,
    warning: colors.warning,
    success: colors.success
};
const styles = StyleSheet.create({
    titleContainer: {
        position: 'relative',
        marginBottom: 20
    },
    titleIcon: {
        position: 'absolute',
        left: -30,
        top: 0
    },
    button: {
        flex: 1
    }
});
const method = (type, config) => {
    if (sibling || !config)
        return;
    if (config.onVisibleChange) {
        config.onVisibleChange(true);
    }
    sibling = new RootSiblings(React.createElement(Modal, Object.assign({}, omit(config, ['content', 'onCancel', 'onOk', 'onVisibleChange', 'title']), { title: null, bodyStyle: {
            paddingLeft: 30
        }, onCancel: () => {
            if (sibling) {
                sibling.destroy();
            }
            if (config.onCancel) {
                config.onCancel();
            }
            if (config.onVisibleChange) {
                config.onVisibleChange(false);
            }
            sibling = null;
        }, onOk: () => {
            if (sibling) {
                sibling.destroy();
            }
            if (config.onOk) {
                config.onOk();
            }
            if (config.onVisibleChange) {
                config.onVisibleChange(false);
            }
            sibling = null;
        }, visible: true }),
        React.createElement(React.Fragment, null,
            React.createElement(View, { style: styles.titleContainer },
                React.createElement(Icon, { name: typeMapIcon[type], size: 20, style: [styles.titleIcon, { color: typeMapIconColor[type] }] }),
                isString(config.title)
                    ? React.createElement(Text, { style: { fontSize: 18, fontWeight: 'bold' } }, config.title)
                    : config.title),
            isString(config.content)
                ? React.createElement(Text, null, config.content)
                : config.content)));
};
export const confirm = (config) => {
    return method('confirm', config);
};
const customizedFooter = ({ onOk, okText }) => (React.createElement(View, { style: styles.button },
    React.createElement(Button, { type: 'primary', title: okText || '知道了', onPress: onOk })));
export const info = (config) => {
    return method('info', Object.assign(Object.assign({}, config), { footer: customizedFooter }));
};
export const error = (config) => {
    return method('error', Object.assign(Object.assign({}, config), { footer: customizedFooter }));
};
export const success = (config) => {
    return method('success', Object.assign(Object.assign({}, config), { footer: customizedFooter }));
};
export const warning = (config) => {
    return method('warning', Object.assign(Object.assign({}, config), { footer: customizedFooter }));
};
