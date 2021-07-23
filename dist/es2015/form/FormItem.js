import * as React from 'react';
import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import * as PropTypes from 'prop-types';
import { FormContext } from './contexts';
import { FormItemLabel } from './FormItemLabel';
import { Field } from './Field';
import { colors, isFunction } from '../utils';
export const FormItem = ({ initialValue, label, labelAlign, name, valuePropName = 'value', changeMethodName = 'onChangeText', rules: ruleList, validateTrigger, labelCol, wrapperCol, children }) => {
    const form = useContext(FormContext);
    let labelText = label;
    if (label && label.indexOf('：') < 0) {
        labelText += '：';
    }
    const rules = ruleList
        ? ruleList.map(rule => isFunction(rule) ? rule(form) : rule)
        : [];
    return (React.createElement(View, { style: [styles.formItem] },
        labelText
            ? (React.createElement(FormItemLabel, { label: labelText, labelAlign: labelAlign, col: labelCol }))
            : null,
        React.createElement(Field, { name: name, rules: rules, valuePropName: valuePropName, changeMethodName: changeMethodName, validateTrigger: validateTrigger, initialValue: initialValue, col: wrapperCol }, children)));
};
FormItem.displayName = 'FormItem';
FormItem.propTypes = {
    initialValue: PropTypes.any,
    label: PropTypes.string,
    labelAlign: PropTypes.oneOf(['left', 'center', 'right']),
    name: PropTypes.string.isRequired,
    valuePropName: PropTypes.string,
    rules: PropTypes.array
};
const styles = StyleSheet.create({
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
        color: colors.error
    }
});
