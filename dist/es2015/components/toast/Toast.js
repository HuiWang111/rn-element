import React from 'react';
import RootToast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    toastWrapper: {
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toastTitle: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 10
    }
});
export class Toast {
    static setDefaultOptions(options) {
        options = options ? Object.assign({}, options) : {};
        if (options.position == null) {
            options.position = RootToast.positions.CENTER;
        }
        return options;
    }
    static handleMessage(message) {
        if (message.length < 27) {
            return message;
        }
        console.warn('[Toast] title提示过长，最多显示26个字符');
        return message.slice(0, 27);
    }
    static show(message, options) {
        RootToast.show(message, this.setDefaultOptions(options));
    }
    static success(message, options) {
        RootToast.show(React.createElement(View, { style: styles.toastWrapper },
            React.createElement(Icon, { name: 'check', size: 50, color: '#fff' }),
            React.createElement(Text, { style: styles.toastTitle }, this.handleMessage(message))), this.setDefaultOptions(options));
    }
    static error(message, options) {
        RootToast.show(React.createElement(View, { style: styles.toastWrapper },
            React.createElement(Icon, { name: 'close', size: 50, color: '#fff' }),
            React.createElement(Text, { style: styles.toastTitle }, this.handleMessage(message))), this.setDefaultOptions(options));
    }
    static warning(message, options) {
        RootToast.show(React.createElement(View, { style: styles.toastWrapper },
            React.createElement(Icon, { name: 'warning', size: 50, color: '#fff' }),
            React.createElement(Text, { style: styles.toastTitle }, this.handleMessage(message))), this.setDefaultOptions(options));
    }
}
