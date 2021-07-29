import React, { Children, cloneElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormItem } from './FormItem';
import PropTypes from 'prop-types';
import { FormContext } from './contexts';
import { FormStore } from './useForm';
import { isNil, colors } from '../../utils';
export const Form = ({ initialValues, form, style, validateTrigger: formValidateTrigger = 'onChange', labelCol: formLabelCol, wrapperCol: formWrapperCol, children }) => {
    const formStyle = style ? [styles.form].concat(style) : [styles.form];
    return (React.createElement(FormContext.Provider, { value: form },
        React.createElement(View, { style: formStyle }, Children.map(children, (child) => {
            const c = child;
            if (c.type === FormItem) {
                const { name, initialValue, validateTrigger: formItemValidateTrigger, labelCol: formItemLabelCol, wrapperCol: formItemWrapperCol } = c.props;
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
                return cloneElement(c, {
                    initialValue: defaultValue,
                    validateTrigger,
                    labelCol,
                    wrapperCol
                });
            }
            return c;
        }))));
};
Form.displayName = 'Form';
Form.propTypes = {
    initialValues: PropTypes.any,
    form: PropTypes.instanceOf(FormStore).isRequired
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
