"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormItem = void 0;
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var PropTypes = require("prop-types");
var contexts_1 = require("./contexts");
var FormItemLabel_1 = require("./FormItemLabel");
var Field_1 = require("./Field");
var utils_1 = require("../utils");
exports.FormItem = function (_a) {
    var initialValue = _a.initialValue, label = _a.label, labelAlign = _a.labelAlign, name = _a.name, _b = _a.valuePropName, valuePropName = _b === void 0 ? 'value' : _b, _c = _a.changeMethodName, changeMethodName = _c === void 0 ? 'onChangeText' : _c, ruleList = _a.rules, validateTrigger = _a.validateTrigger, labelCol = _a.labelCol, wrapperCol = _a.wrapperCol, children = _a.children;
    var form = react_1.useContext(contexts_1.FormContext);
    var labelText = label;
    if (label && label.indexOf('：') < 0) {
        labelText += '：';
    }
    var rules = ruleList
        ? ruleList.map(function (rule) { return utils_1.isFunction(rule) ? rule(form) : rule; })
        : [];
    return (React.createElement(react_native_1.View, { style: [styles.formItem] },
        labelText
            ? (React.createElement(FormItemLabel_1.FormItemLabel, { label: labelText, labelAlign: labelAlign, col: labelCol }))
            : null,
        React.createElement(Field_1.Field, { name: name, rules: rules, valuePropName: valuePropName, changeMethodName: changeMethodName, validateTrigger: validateTrigger, initialValue: initialValue, col: wrapperCol }, children)));
};
exports.FormItem.displayName = 'FormItem';
exports.FormItem.propTypes = {
    initialValue: PropTypes.any,
    label: PropTypes.string,
    labelAlign: PropTypes.oneOf(['left', 'center', 'right']),
    name: PropTypes.string.isRequired,
    valuePropName: PropTypes.string,
    rules: PropTypes.array
};
var styles = react_native_1.StyleSheet.create({
    formItem: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 24,
        padding: 0,
        height: 50
    },
    formItemError: {},
    formItemErrorMsg: {
        color: utils_1.colors.error
    }
});
