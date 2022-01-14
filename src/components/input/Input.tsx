import React, { FC, forwardRef, ForwardedRef, ClassAttributes, ReactNode, isValidElement, cloneElement } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { IInputProps } from './interface'
import { colors } from '../../utils'
import { BaseHeight } from '../../constants'

export const Input: FC<IInputProps & ClassAttributes<TextInput>> = forwardRef(({
    clearable = true,
    editable = true,
    style,
    wrapStyle,
    value,
    rightIcon,
    onChangeText,
    ...restProps
}: IInputProps, ref: ForwardedRef<TextInput>) => {
    const handleClear = () => {
        onChangeText?.('')
    }
    const renderIcon = (
        clearable: boolean,
        editable: boolean,
        hasValue: boolean,
        IconNode?: ReactNode
    ): ReactNode => {
        if (clearable && editable && hasValue) {
            return (
                <View style={styles.closeIconWrap}>
                    <Icon name='closecircle' style={styles.icon} onPress={handleClear} />
                </View>
            )
        } else if (isValidElement(IconNode)) {
            return (
                <View style={styles.closeIconWrap}>
                    {
                        cloneElement(IconNode, {
                            style: [
                                styles.icon,
                                IconNode.props.style
                            ]
                        })
                    }
                </View>
            )
        }
        return null
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
            {
                renderIcon(
                    clearable,
                    editable,
                    Boolean(value),
                    rightIcon
                )
            }
        </View>
    )
})

Input.displayName = 'Input'

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
        borderColor: colors.border
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
    icon: {
        color: '#00000040'
    }
})
