import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styleUtils } from '../../utils';
export const FormItemLabel = ({ label, labelAlign = 'right', col }) => {
    let formItemLabelStyle = [styles.formItemLabel];
    if (col) {
        if (col.span) {
            formItemLabelStyle = formItemLabelStyle.concat(styleUtils[`span-${col.span}`]);
        }
        if (col.offset) {
            formItemLabelStyle = formItemLabelStyle.concat(styleUtils[`offset-${col.offset}`]);
        }
    }
    return (React.createElement(View, { style: formItemLabelStyle },
        React.createElement(Text, { style: [
                styles.formItemLabelText,
                {
                    textAlign: labelAlign
                }
            ] }, label)));
};
const styles = StyleSheet.create({
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
