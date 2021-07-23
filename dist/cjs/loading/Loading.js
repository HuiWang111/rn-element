"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var react_native_root_siblings_1 = require("react-native-root-siblings");
var _a = react_native_1.Dimensions.get('window'), width = _a.width, height = _a.height;
var Loading = (function () {
    function Loading() {
    }
    Loading.show = function () {
        if (Loading.sibling) {
            return;
        }
        Loading.sibling = new react_native_root_siblings_1.default(React.createElement(react_native_1.View, { style: styles.maskStyle },
            React.createElement(react_native_1.View, { style: styles.backViewStyle },
                React.createElement(react_native_1.ActivityIndicator, { size: 'large', color: 'white' }))));
    };
    Loading.hide = function () {
        if (!Loading.sibling) {
            return;
        }
        Loading.sibling.destroy();
        Loading.sibling = null;
    };
    Loading.sibling = null;
    return Loading;
}());
exports.Loading = Loading;
var styles = react_native_1.StyleSheet.create({
    maskStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backViewStyle: {
        backgroundColor: '#111',
        width: 120,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
});
