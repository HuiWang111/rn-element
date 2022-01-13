import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IFormItemLabelProps } from './interface'
import { styleUtils, isString } from '../../utils'

export const FormItemLabel: FC<IFormItemLabelProps> = ({
    label,
    labelAlign = 'right',
    col,
    style,
    textStyle
}: IFormItemLabelProps) => {
    let formItemLabelStyle = [styles.formItemLabel, style]
    if (col) {
        if (col.span) {
            formItemLabelStyle = formItemLabelStyle.concat(styleUtils[`span-${col.span}`] as never)
        }
        if (col.offset) {
            formItemLabelStyle = formItemLabelStyle.concat(styleUtils[`offset-${col.offset}`] as never)
        }
    }

    return (
        <View style={formItemLabelStyle}>
            {
                isString(label)
                    ? <Text
                        style={[
                            styles.formItemLabelText,
                            textStyle,
                            {
                                textAlign: labelAlign
                            }
                        ]}
                    >
                        { label }
                    </Text>
                    : label
            }
        </View>
    )
}

FormItemLabel.displayName = 'FormItemLabel'

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
})
