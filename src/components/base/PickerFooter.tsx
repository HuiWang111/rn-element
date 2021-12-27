import React, { FC } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { IPickerFooterProps } from './interface';
import { useTheme } from '../../hooks'

export const PickerFooter: FC<IPickerFooterProps> = ({
    onCancel,
    onConfirm
}: IPickerFooterProps) => {
    const activeOpacity = 0.7;
    const colors = useTheme();
    const textStyle = {
        color: colors.primary
    };

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
                <Text style={textStyle}>取消</Text>
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
                    确认
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 50,
        borderTopWidth: 1,
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmBtn: {
        borderLeftWidth: 1
    }
});
