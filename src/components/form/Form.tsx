import React, { FC, PropsWithChildren, Children, ReactElement, cloneElement, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { FormItem } from './FormItem'
import PropTypes from 'prop-types'
import { FormContext } from './contexts'
import { IFormProps, IParentProps } from './interface'
import { isNil } from '../../utils'
import { Toast } from '../toast'
import { Input } from '../input'

/**
 * 这里实现深度遍历children查找Form.Item组件
 */
function mapChildrenWithFindFormItem(c: ReactElement, formProps: IParentProps): ReactElement {
    if (c.type === FormItem) {
        const {
            initialValues,
            formValidateTrigger,
            formLabelCol,
            formWrapperCol,
            formWrapperStyle,
            formInputComponent,
            formErrorHandler
        } = formProps
        const {
            name,
            initialValue,
            validateTrigger: formItemValidateTrigger,
            labelCol: formItemLabelCol,
            wrapperCol: formItemWrapperCol,
            errorHandler: formItemErrorHandler,
            wrapperStyle: formItemWrapperStyle,
            inputComponent: formItemInputComponent
        } = c.props
        const defaultValue = !initialValues || isNil(initialValues[name])
            ? initialValue
            : initialValues[name]
        const validateTrigger = formItemValidateTrigger
            ? formItemValidateTrigger
            : formValidateTrigger
        const labelCol = isNil(formLabelCol) && isNil(formItemLabelCol)
            ? undefined
            : (formItemLabelCol || formLabelCol)
        const wrapperCol = isNil(formWrapperCol) && isNil(formItemWrapperCol)
            ? undefined
            : (formItemWrapperCol || formWrapperCol)
        const errorHandler = formItemErrorHandler
            ? formItemErrorHandler
            : formErrorHandler
        const inputComponent = formItemInputComponent
            ? formItemInputComponent
            : formInputComponent
        const wrapperStyle = formItemWrapperStyle
            ? formItemWrapperStyle
            : formWrapperStyle

        return cloneElement(c, {
            initialValue: defaultValue,
            validateTrigger,
            labelCol,
            wrapperCol,
            errorHandler,
            inputComponent,
            wrapperStyle
        })
    }

    const children = c.props?.children
    
    return children
        ? cloneElement(c, {}, Children.map(children, (child) => {
            return mapChildrenWithFindFormItem(child, formProps)
        }))
        : c
}

export const Form: FC<PropsWithChildren<IFormProps>> = ({
    initialValues,
    form,
    style,
    wrapperStyle: formWrapperStyle,
    validateTrigger: formValidateTrigger = 'onChange',
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    errorHandler: formErrorHandler = Toast.show,
    inputComponent: formInputComponent = Input,
    children
}: PropsWithChildren<IFormProps>) => {
    const formStyle = style ? [styles.form].concat(style as never) : [styles.form]

    return (
        <FormContext.Provider value={form}>
            <View style={formStyle}>
                {
                    Children.map(children, (child: ReactNode) => {
                        const c = child as ReactElement
                        
                        return mapChildrenWithFindFormItem(c, {
                            initialValues,
                            formValidateTrigger,
                            formLabelCol,
                            formWrapperCol,
                            formWrapperStyle,
                            formInputComponent,
                            formErrorHandler
                        })
                    })
                }
            </View>
        </FormContext.Provider>
    )
}

Form.displayName = 'Form'
Form.propTypes = {
    initialValues: PropTypes.any
}

const styles = StyleSheet.create({
    form: {
        margin: 0,
        padding: 0,
        fontSize: 14,
        fontVariant: ['tabular-nums']
    }
})
