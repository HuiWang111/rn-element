import React, {
    FC,
    PropsWithChildren,
    useContext
} from 'react'
import { View, StyleSheet } from 'react-native'
import { FormInstance, IFormItemProps, ValidateTrigger, IRuleConfig } from './interface'
import PropTypes from 'prop-types'
import { FormContext } from './contexts'
import { FormItemLabel } from './FormItemLabel'
import { Field } from './Field'
import { isFunction } from '../../utils'
import { BaseHeight } from '../../constants'

export const FormItem: FC<PropsWithChildren<IFormItemProps>> = ({
    initialValue,
    label,
    labelAlign,
    name,
    valuePropName = 'value',
    changeMethodName = 'onChangeText',
    rules: ruleList,
    validateTrigger,
    labelCol,
    wrapperCol,
    wrapperStyle,
    inputComponent,
    numeric = false,
    style,
    labelStyle,
    labelTextStyle,
    errorHandler,
    shouldUpdate = false,
    children
}: PropsWithChildren<IFormItemProps>) => {
    const form = useContext(FormContext)

    const rules = ruleList
        ? ruleList.map(rule => isFunction<IRuleConfig>(rule) ? rule(form as FormInstance) : rule)
        : []

    return (
        <View style={[styles.formItem, style]}>
            {
                label
                    ? (
                        <FormItemLabel
                            label={label}
                            labelAlign={labelAlign}
                            col={labelCol}
                            style={labelStyle}
                            textStyle={labelTextStyle}
                        />
                    )
                    : null
            }
            <Field
                name={name}
                rules={rules}
                valuePropName={valuePropName}
                changeMethodName={changeMethodName}
                validateTrigger={validateTrigger as ValidateTrigger}
                initialValue={initialValue}
                col={wrapperCol}
                errorHandler={errorHandler}
                inputComponent={inputComponent}
                numeric={numeric}
                style={wrapperStyle}
                shouldUpdate={shouldUpdate}
            >
                { children }
            </Field>
        </View>
    )
}

FormItem.displayName = 'FormItem'
FormItem.propTypes = {
    initialValue: PropTypes.any,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    labelAlign: PropTypes.oneOf(['left', 'center', 'right']),
    name: PropTypes.string,
    valuePropName: PropTypes.string,
    rules: PropTypes.array
}

const styles = StyleSheet.create({
    formItem: {
        flexDirection: 'row',
        marginHorizontal: 0,
        marginTop: 0,
        padding: 0,
        minHeight: BaseHeight
    }
})