import React, { FC, forwardRef, ForwardedRef, ClassAttributes } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { IInputProps } from './interface';
import { colors } from '../../utils'
import { BaseHeight } from '../../constants'

export const Input: FC<IInputProps & ClassAttributes<TextInput>> = forwardRef(({
    clearable = true,
    editable = true,
    style,
    wrapStyle,
    value,
    onChangeText,
    ...restProps
}: IInputProps, ref: ForwardedRef<TextInput>) => {
    const handleClear = () => {
        onChangeText?.('');
    }

    return (
        <View style={[
            styles.inputContainer,
            wrapStyle,
            !editable ? styles.disabledInputContainer : null
        ]}>
            <TextInput
                editable={editable}
                ref={ref}
                style={[
                    styles.input,
                    style,
                    !editable ? styles.disabledInput : null,
                    clearable ? { marginRight: 5 } : null
                ]}
                value={value}
                onChangeText={onChangeText}
                { ...restProps }
            />
            { clearable && editable && Boolean(value) && (
                <View style={styles.closeIconWrap}>
                    <Icon name='closecircle' style={styles.closeIcon} onPress={handleClear} />
                </View>
            ) }
        </View>
    );
})

Input.displayName = 'Input';

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: BaseHeight,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        borderRadius: 2,
        paddingHorizontal: 10
    },
    disabledInputContainer: {
        backgroundColor: '#f5f5f5',
        borderColor: '#d9d9d9'
    },
    input: {
        color: '#000',
        flex: 1,
        height: BaseHeight,
        padding: 0
    },
    disabledInput: {
        color: '#00000040'
    },
    closeIconWrap: {
        width: 14,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeIcon: {
        color: '#00000040'
    }
});
