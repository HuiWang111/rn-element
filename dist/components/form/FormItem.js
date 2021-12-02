import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { FormContext } from './contexts';
import { FormItemLabel } from './FormItemLabel';
import { Field } from './Field';
import { isFunction } from '../../utils';
export const FormItem = ({ initialValue, label, labelAlign, name, valuePropName = 'value', changeMethodName = 'onChangeText', rules: ruleList, validateTrigger, labelCol, wrapperCol, wrapperStyle, inputComponent, errorHandler, children }) => {
    const form = useContext(FormContext);
    const rules = ruleList
        ? ruleList.map(rule => isFunction(rule) ? rule(form) : rule)
        : [];
    return (React.createElement(View, { style: [styles.formItem] },
        label
            ? (React.createElement(FormItemLabel, { label: label, labelAlign: labelAlign, col: labelCol }))
            : null,
        React.createElement(Field, { name: name, rules: rules, valuePropName: valuePropName, changeMethodName: changeMethodName, validateTrigger: validateTrigger, initialValue: initialValue, col: wrapperCol, errorHandler: errorHandler, inputComponent: inputComponent, style: wrapperStyle }, children)));
};
FormItem.displayName = 'FormItem';
FormItem.propTypes = {
    initialValue: PropTypes.any,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    labelAlign: PropTypes.oneOf(['left', 'center', 'right']),
    name: PropTypes.string.isRequired,
    valuePropName: PropTypes.string,
    rules: PropTypes.array
};
const styles = StyleSheet.create({
    formItem: {
        flexDirection: 'row',
        marginHorizontal: 0,
        marginTop: 0,
        padding: 0,
        height: 50
    }
});
