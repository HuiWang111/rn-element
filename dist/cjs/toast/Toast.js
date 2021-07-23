"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
var React = require("react");
var react_native_root_toast_1 = require("react-native-root-toast");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var react_native_1 = require("react-native");
var styles = react_native_1.StyleSheet.create({
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
var Toast = (function () {
    function Toast() {
    }
    Toast.setDefaultOptions = function (options) {
        options = options ? __assign({}, options) : {};
        if (options.position == null) {
            options.position = react_native_root_toast_1.default.positions.CENTER;
        }
        return options;
    };
    Toast.handleMessage = function (message) {
        if (message.length < 27) {
            return message;
        }
        console.warn('[Toast] title提示过长，最多显示26个字符');
        return message.slice(0, 27);
    };
    Toast.show = function (message, options) {
        react_native_root_toast_1.default.show(message, this.setDefaultOptions(options));
    };
    Toast.success = function (message, options) {
        react_native_root_toast_1.default.show(React.createElement(react_native_1.View, { style: styles.toastWrapper },
            React.createElement(FontAwesome_1.default, { name: 'check', size: 50, color: '#fff' }),
            React.createElement(react_native_1.Text, { style: styles.toastTitle }, this.handleMessage(message))), this.setDefaultOptions(options));
    };
    Toast.error = function (message, options) {
        react_native_root_toast_1.default.show(React.createElement(react_native_1.View, { style: styles.toastWrapper },
            React.createElement(FontAwesome_1.default, { name: 'close', size: 50, color: '#fff' }),
            React.createElement(react_native_1.Text, { style: styles.toastTitle }, this.handleMessage(message))), this.setDefaultOptions(options));
    };
    Toast.warning = function (message, options) {
        react_native_root_toast_1.default.show(React.createElement(react_native_1.View, { style: styles.toastWrapper },
            React.createElement(FontAwesome_1.default, { name: 'warning', size: 50, color: '#fff' }),
            React.createElement(react_native_1.Text, { style: styles.toastTitle }, this.handleMessage(message))), this.setDefaultOptions(options));
    };
    return Toast;
}());
exports.Toast = Toast;
