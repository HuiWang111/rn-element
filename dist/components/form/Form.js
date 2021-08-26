import React, { Children, cloneElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormItem } from './FormItem';
import PropTypes from 'prop-types';
import { FormContext } from './contexts';
import { isNil, colors } from '../../utils';
import { Toast } from '../toast';
function mapChildrenWithFindFormItem(c, formProps) {
    var _a;
    if (c.type === FormItem) {
        const { initialValues, formValidateTrigger, formLabelCol, formWrapperCol, formErrorHandler } = formProps;
        const { name, initialValue, validateTrigger: formItemValidateTrigger, labelCol: formItemLabelCol, wrapperCol: formItemWrapperCol, errorHandler: formItemErrorHandler } = c.props;
        const defaultValue = !initialValues || isNil(initialValues[name])
            ? initialValue
            : initialValues[name];
        const validateTrigger = formItemValidateTrigger
            ? formItemValidateTrigger
            : formValidateTrigger;
        const labelCol = isNil(formLabelCol) && isNil(formItemLabelCol)
            ? undefined
            : (formItemLabelCol || formLabelCol);
        const wrapperCol = isNil(formWrapperCol) && isNil(formItemWrapperCol)
            ? undefined
            : (formItemWrapperCol || formWrapperCol);
        const errorHandler = formItemErrorHandler
            ? formItemErrorHandler
            : formErrorHandler;
        return cloneElement(c, {
            initialValue: defaultValue,
            validateTrigger,
            labelCol,
            wrapperCol,
            errorHandler
        });
    }
    const children = (_a = c.props) === null || _a === void 0 ? void 0 : _a.children;
    return children
        ? cloneElement(c, {}, Children.map(children, (child) => {
            return mapChildrenWithFindFormItem(child, formProps);
        }))
        : c;
}
export const Form = ({ initialValues, form, style, validateTrigger: formValidateTrigger = 'onChange', labelCol: formLabelCol, wrapperCol: formWrapperCol, errorHandler: formErrorHandler = Toast.show, children }) => {
    const formStyle = style ? [styles.form].concat(style) : [styles.form];
    return (React.createElement(FormContext.Provider, { value: form },
        React.createElement(View, { style: formStyle }, Children.map(children, (child) => {
            const c = child;
            return mapChildrenWithFindFormItem(c, {
                initialValues,
                formValidateTrigger,
                formLabelCol,
                formWrapperCol,
                formErrorHandler
            });
        }))));
};
Form.displayName = 'Form';
Form.propTypes = {
    initialValues: PropTypes.any
};
const styles = StyleSheet.create({
    form: {
        margin: 0,
        padding: 0,
        color: colors.black,
        fontSize: 14,
        fontVariant: ['tabular-nums']
    }
});
