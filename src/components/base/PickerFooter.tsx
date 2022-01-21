import React, { FC } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextStyle
} from 'react-native'
import { IPickerFooterProps } from './interface'
import { useTheme } from '../../hooks'

export const PickerFooter: FC<IPickerFooterProps> = ({
    cancelText = '取消',
    confirmText = '确认',
    onCancel,
    onConfirm
}: IPickerFooterProps) => {
    const activeOpacity = 0.7
    const colors = useTheme()
    const textStyle: TextStyle = {
        color: colors.primary
    }

    return (
        <View
            style={[
                styles.footer,
                {
                    borderTopColor: colors.border
                }
            ]}
        >
            <TouchableOpacity 
                style={styles.btn}
                activeOpacity={activeOpacity}
                onPress={onCancel}
            >
                <Text style={textStyle}>
                    { cancelText }
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.btn,
                    styles.confirmBtn,
                    {
                        borderLeftColor: colors.border
                    }
                ]}
                activeOpacity={activeOpacity}
                onPress={onConfirm}
            >
                <Text style={textStyle}>
                    { confirmText }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

PickerFooter.displayName = 'PickerFooter'

const styles = StyleSheet.create({
    footer: {
        height: 50,
        borderTopWidth: 1,
        flexDirection: 'row',
        flexGrow: 0
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmBtn: {
        borderLeftWidth: 1
    }
})
