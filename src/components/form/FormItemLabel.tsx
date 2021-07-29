import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IFormItemLabelProps } from './interface';
import { styleUtils } from '../../utils';

export const FormItemLabel: FC<IFormItemLabelProps> = ({
    label,
    labelAlign = 'right',
    col
}: IFormItemLabelProps) => {
    let formItemLabelStyle = [styles.formItemLabel];
    if (col) {
        if (col.span) {
            formItemLabelStyle = formItemLabelStyle.concat(styleUtils[`span-${col.span}`] as never);
        }
        if (col.offset) {
            formItemLabelStyle = formItemLabelStyle.concat(styleUtils[`offset-${col.offset}`] as never);
        }
    }

    return (
        <View style={formItemLabelStyle}>
            <Text
                style={[
                    styles.formItemLabelText,
                    {
                        textAlign: labelAlign
                    }
                ]}
            >
                { label }
            </Text>
        </View>
    );
}

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
