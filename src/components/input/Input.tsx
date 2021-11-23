import React, { FC, forwardRef, ForwardedRef, ClassAttributes } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { IInputProps } from './interface';

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
            wrapStyle
        ]}>
            <TextInput
                editable={editable}
                ref={ref}
                style={[
                    styles.input,
                    style,
                    !editable ? styles.disabledInput : null,
                    clearable ? { paddingRight: 24 } : null
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
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    input: {
        color: '#000'
    },
    disabledInput: {
        backgroundColor: '#f5f5f5',
        color: '#00000040',
        borderColor: '#d9d9d9'
    },
    closeIconWrap: {
        width: 20, 
        height: '100%',
        position: 'absolute',
        right: 2,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeIcon: {
        color: '#00000040',
        width: 20,
        height: 20
    }
});
