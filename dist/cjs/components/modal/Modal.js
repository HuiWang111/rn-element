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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var utils_1 = require("../../utils");
exports.Modal = function (_a) {
    var title = _a.title, footer = _a.footer, zIndex = _a.zIndex, _b = _a.okText, okText = _b === void 0 ? '确定' : _b, _c = _a.cancelText, cancelText = _c === void 0 ? '取消' : _c, titleStyle = _a.titleStyle, bodyStyle = _a.bodyStyle, footerStyle = _a.footerStyle, onOk = _a.onOk, onCancel = _a.onCancel, children = _a.children, _d = _a.visible, visible = _d === void 0 ? false : _d, onVisibleChange = _a.onVisibleChange, restProps = __rest(_a, ["title", "footer", "zIndex", "okText", "cancelText", "titleStyle", "bodyStyle", "footerStyle", "onOk", "onCancel", "children", "visible", "onVisibleChange"]);
    var width = react_native_1.useWindowDimensions().width;
    var commonStyle = {
        width: width - 80
    };
    var renderWithText = function (content) {
        return utils_1.isString(content)
            ? react_1.default.createElement(react_native_1.Text, null, content)
            : content;
    };
    var getFooter = function (footer) {
        if (utils_1.isUndefined(footer)) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_native_1.View, { style: styles.okBtnWrap },
                    react_1.default.createElement(react_native_1.Button, { title: okText, onPress: function () { onOk && onOk(); } })),
                react_1.default.createElement(react_native_1.View, { style: styles.cancalBtnWrap },
                    react_1.default.createElement(react_native_1.Button, { title: cancelText, onPress: function () { onCancel && onCancel(); }, color: '#d7d7d7' }))));
        }
        return renderWithText(footer);
    };
    react_1.useEffect(function () {
        onVisibleChange && onVisibleChange(visible);
    }, [visible, onVisibleChange]);
    return (react_1.default.createElement(react_native_1.Modal, __assign({ animationType: 'slide', transparent: true, style: {
            zIndex: zIndex
        }, visible: visible }, restProps),
        react_1.default.createElement(react_native_1.View, { style: styles.centeredView },
            react_1.default.createElement(react_native_1.View, { style: styles.modalView },
                react_1.default.createElement(react_native_1.View, { style: [styles.title, commonStyle, titleStyle] }, renderWithText(title)),
                children
                    ? (react_1.default.createElement(react_native_1.View, { style: [styles.body, commonStyle, bodyStyle] }, renderWithText(children)))
                    : null,
                react_1.default.createElement(react_native_1.View, { style: [styles.footer, commonStyle, footerStyle] }, getFooter(footer))))));
};
var styles = react_native_1.StyleSheet.create({
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
        borderBottomColor: utils_1.colors.border
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
