import React, { FC, PropsWithChildren, Children, ReactElement, cloneElement, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormItem } from './FormItem';
import PropTypes from 'prop-types';
import { FormContext } from './contexts';
import { FormStore } from './useForm';
import { IFormProps } from './interface';
import { isNil, colors } from '../../utils';
import { Toast } from '../toast';
import { mapChildrenWithFindFormItem } from './utils';

export const Form: FC<PropsWithChildren<IFormProps>> = ({
    initialValues,
    form,
    style,
    validateTrigger: formValidateTrigger = 'onChange',
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    errorHandler: formErrorHandler = Toast.show,
    children
}: PropsWithChildren<IFormProps>) => {
    const formStyle = style ? [styles.form].concat(style as never) : [styles.form];

    return (
        <FormContext.Provider value={form}>
            <View style={formStyle}>
                {
                    Children.map(children, (child: ReactNode) => {
                        const c = child as ReactElement;

                        if (c.type === FormItem) {
                            const {
                                name,
                                initialValue,
                                validateTrigger: formItemValidateTrigger,
                                labelCol: formItemLabelCol,
                                wrapperCol: formItemWrapperCol,
                                errorHandler: formItemErrorHandler
                            } = c.props;
                            const defaultValue = !initialValues || isNil(initialValues[name])
                                ? initialValue
                                : initialValues[name];
                            const validateTrigger = formItemValidateTrigger
                                ? formItemValidateTrigger
                                : formValidateTrigger;
                            const labelCol = isNil(formLabelCol) && isNil(formItemLabelCol)
                                ? undefined
                                : (formItemLabelCol || formLabelCol);
                            const wrapperCol = isNil(formWrapperCol) && isNil(formItemWrapperCol)
                                ? undefined
                                : (formItemWrapperCol || formWrapperCol);
                            const errorHandler = formItemErrorHandler
                                ? formItemErrorHandler
                                : formErrorHandler;

                            return mapChildrenWithFindFormItem(c, {
                                initialValue: defaultValue,
                                validateTrigger,
                                labelCol,
                                wrapperCol,
                                errorHandler
                            });
                        }

                        return c;
                    })
                }
            </View>
        </FormContext.Provider>
    );
}

Form.displayName = 'Form';
Form.propTypes = {
    initialValues: PropTypes.any,
    // form: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    form: {
        margin: 0,
        padding: 0,
        color: colors.black,
        fontSize: 14,
        fontVariant: ['tabular-nums']
    }
});
