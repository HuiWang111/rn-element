import React, { FC } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { IPickerFooterProps } from './interface';
import { colors } from '../../utils';

export const PickerFooter: FC<IPickerFooterProps> = ({
    onCancel,
    onConfirm
}: IPickerFooterProps) => {
    const activeOpacity = 0.7;

    return (
        <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.btn}
                activeOpacity={activeOpacity}
                onPress={onCancel}
            >
                <Text style={styles.text}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btn, styles.confirmBtn]}
                activeOpacity={activeOpacity}
                onPress={onConfirm}
            >
                <Text style={styles.text}>确认</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 60,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmBtn: {
        borderLeftColor: colors.border,
        borderLeftWidth: 1
    },
    text: {
        color: colors.primary
    }
});
