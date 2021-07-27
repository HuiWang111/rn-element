"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var FormItem_1 = require("./FormItem");
var prop_types_1 = require("prop-types");
var contexts_1 = require("./contexts");
var useForm_1 = require("./useForm");
var utils_1 = require("../utils");
exports.Form = function (_a) {
    var initialValues = _a.initialValues, form = _a.form, style = _a.style, _b = _a.validateTrigger, formValidateTrigger = _b === void 0 ? 'onChange' : _b, formLabelCol = _a.labelCol, formWrapperCol = _a.wrapperCol, children = _a.children;
    var formStyle = style ? [styles.form].concat(style) : [styles.form];
    return (react_1.default.createElement(contexts_1.FormContext.Provider, { value: form },
        react_1.default.createElement(react_native_1.View, { style: formStyle }, react_1.Children.map(children, function (child) {
            var c = child;
            if (c.type === FormItem_1.FormItem) {
                var _a = c.props, name_1 = _a.name, initialValue = _a.initialValue, formItemValidateTrigger = _a.validateTrigger, formItemLabelCol = _a.labelCol, formItemWrapperCol = _a.wrapperCol;
                var defaultValue = !initialValues || utils_1.isNil(initialValues[name_1])
                    ? initialValue
                    : initialValues[name_1];
                var validateTrigger = formItemValidateTrigger
                    ? formItemValidateTrigger
                    : formValidateTrigger;
                var labelCol = utils_1.isNil(formLabelCol) && utils_1.isNil(formItemLabelCol)
                    ? undefined
                    : (formItemLabelCol || formLabelCol);
                var wrapperCol = utils_1.isNil(formWrapperCol) && utils_1.isNil(formItemWrapperCol)
                    ? undefined
                    : (formItemWrapperCol || formWrapperCol);
                return react_1.cloneElement(c, {
                    initialValue: defaultValue,
                    validateTrigger: validateTrigger,
                    labelCol: labelCol,
                    wrapperCol: wrapperCol
                });
            }
            return c;
        }))));
};
exports.Form.displayName = 'Form';
exports.Form.propTypes = {
    initialValues: prop_types_1.default.any,
    form: prop_types_1.default.instanceOf(useForm_1.FormStore).isRequired
};
var styles = react_native_1.StyleSheet.create({
    form: {
        margin: 0,
        padding: 0,
        color: utils_1.colors.black,
        fontSize: 14,
        fontVariant: ['tabular-nums']
    }
});
