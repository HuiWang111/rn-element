"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormItemLabel = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var utils_1 = require("../utils");
exports.FormItemLabel = function (_a) {
    var label = _a.label, _b = _a.labelAlign, labelAlign = _b === void 0 ? 'right' : _b, col = _a.col;
    var formItemLabelStyle = [styles.formItemLabel];
    if (col) {
        if (col.span) {
            formItemLabelStyle = formItemLabelStyle.concat(utils_1.styleUtils["span-" + col.span]);
        }
        if (col.offset) {
            formItemLabelStyle = formItemLabelStyle.concat(utils_1.styleUtils["offset-" + col.offset]);
        }
    }
    return (react_1.default.createElement(react_native_1.View, { style: formItemLabelStyle },
        react_1.default.createElement(react_native_1.Text, { style: [
                styles.formItemLabelText,
                {
                    textAlign: labelAlign
                }
            ] }, label)));
};
var styles = react_native_1.StyleSheet.create({
    formItemLabel: {
        flexGrow: 0,
        overflow: 'hidden',
        height: 48.8,
        justifyContent: 'center'
    },
    formItemLabelText: {
        fontSize: 18
    }
});
