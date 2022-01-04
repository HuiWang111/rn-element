import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styleUtils, isString } from '../../utils';
export const FormItemLabel = ({ label, labelAlign = 'right', col, style, textStyle }) => {
    let formItemLabelStyle = [styles.formItemLabel, style];
    if (col) {
        if (col.span) {
            formItemLabelStyle = formItemLabelStyle.concat(styleUtils[`span-${col.span}`]);
        }
        if (col.offset) {
            formItemLabelStyle = formItemLabelStyle.concat(styleUtils[`offset-${col.offset}`]);
        }
    }
    return (React.createElement(View, { style: formItemLabelStyle }, isString(label)
        ? React.createElement(Text, { style: [
                styles.formItemLabelText,
                textStyle,
                {
                    textAlign: labelAlign
                }
            ] }, label)
        : label));
};
FormItemLabel.displayName = 'FormItemLabel';
const styles = StyleSheet.create({
    formItemLabel: {
        flexGrow: 0,
        overflow: 'hidden',
        minHeight: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
    formItemLabelText: {
        fontSize: 14
    }
});
