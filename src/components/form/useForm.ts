import {
    FormInstance,
    StoreValue,
    ValueType,
    IFormStore,
    IFieldEntity,
    InternalHooks
} from './interface'
import { useRef } from 'react'
import { HOOK_MARK } from './contexts'
import { warning, isUndefined } from '../../utils'

export class FormStore implements IFormStore, InternalHooks {
    private values: StoreValue
    private initialValues: StoreValue
    private errors: Record<string, string>
    private fieldEntities: IFieldEntity[]

    constructor() {
        this.values = {}
        this.initialValues = {}
        this.errors = {}
        this.fieldEntities = []

        this.getFieldsValue = this.getFieldsValue.bind(this)
        this.getFieldValue = this.getFieldValue.bind(this)
        this.resetFields = this.resetFields.bind(this)
        this.setFieldsValue = this.setFieldsValue.bind(this)
        this.setFieldValue = this.setFieldValue.bind(this)
        this.validateFields = this.validateFields.bind(this)
        this.getFieldError = this.getFieldError.bind(this)
        this.getFieldsError = this.getFieldsError.bind(this)
        this.setFieldError = this.setFieldError.bind(this)
        this.removeFieldError = this.removeFieldError.bind(this)
    }

    getForm = <V>(): FormInstance<V> => {
        return {
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            resetFields: this.resetFields,
            setFieldsValue: this.setFieldsValue,
            setFieldValue: this.setFieldValue,
            validateFields: this.validateFields,
            getFieldError: this.getFieldError,
            getFieldsError: this.getFieldsError,
            getInternalHooks: this.getInternalHooks
        }
    }

    getInternalHooks = (mark?: string): InternalHooks | null => {
        if (mark === HOOK_MARK) {
            return {
                registerField: this.registerField,
                unregisterField: this.unregisterField,
                getForm: this.getForm,
                setFieldError: this.setFieldError,
                setInitialValue: this.setInitialValue,
                removeFieldError: this.removeFieldError
            }
        }

        warning(false, '`getInternalHooks` is internal usage. Should not call directly.')
        return null
    }

    private notifyObservers(
        prevValues: StoreValue,
        fields: string[] = [],
        force = false
    ) {
        this.fieldEntities.forEach(entity => {
            const shouldUpdate = entity.props.shouldUpdate

            if (force) {
                entity.reRender()
            } else if (fields.includes(entity.props.name as string)) {
                entity.reRender()
            } else if (typeof shouldUpdate === 'function' && shouldUpdate(prevValues, { ...this.values })) {
                entity.reRender()
            } else if (shouldUpdate) {
                entity.reRender()
            }
        })
    }

    setInitialValue = (field: string, initialValue: ValueType): void => {
        if (!isUndefined(initialValue)) {
            this.initialValues[field] = initialValue
            this.setFieldValue(field, initialValue)
        }
    }

    registerField = (fieldEntity: IFieldEntity): void => {
        this.fieldEntities.push(fieldEntity)
    }

    unregisterField = (fieldEntity: IFieldEntity): void => {
        this.fieldEntities = this.fieldEntities.filter(f => f !== fieldEntity)
    }

    getFieldsValue(fields?: string[]): StoreValue {
        if (fields == null) {
            return { ...this.values }
        }

        return fields.reduce((values: Record<string, any>, field) => {
            values[field] = this.values[field]
            return values
        }, {})
    }

    getFieldValue(field?: string): ValueType {
        if (field == null) {
            return
        }

        return this.values[field]
    }

    getFieldError(field: string): string | undefined {
        return this.errors[field]
    }

    getFieldsError(fields?: string[]): Record<string, string> {
        if (!fields || !fields.length) return {}

        return fields.reduce((errors: Record<string, any>, field) => {
            const error = this.errors[field]
            if (error) {
                errors[field] = error
            }
            return errors
        }, {})
    }

    resetFields(fields?: string[]): void {
        const prevValues = { ...this.values }

        if (fields == null) {
            this.values = { ...this.initialValues }
        } else {
            fields.forEach(field => {
                this.values[field] = this.initialValues[field]
            })
        }

        this.notifyObservers(prevValues, undefined, true)
    }

    setFieldsValue(values?: StoreValue): void {
        if (values == null) {
            return
        }

        const prevValues = { ...this.values }
        this.values = { ...this.values, ...values }
        this.notifyObservers(prevValues, Object.keys(values))
    }

    setFieldValue(field: string, value: ValueType): void {
        if (field == null) {
            return
        }

        const prevValues = { ...this.values }
        this.values[field] = value
        this.notifyObservers(prevValues, [field])
    }

    setFieldError(field: string, message: string): void {
        this.errors[field] = message
    }

    removeFieldError(field: string): void {
        delete this.errors[field]
    }

    async validateFields(fields?: string[]): Promise<ValueType> {
        let fieldEntities: IFieldEntity[]
        if (fields) {
            fieldEntities = this.fieldEntities.filter(entity => fields.includes(entity.props.name as string))
        } else {
            fieldEntities = [...this.fieldEntities]
        }

        for (const entity of fieldEntities) {
            const { name } = entity.props

            if (name) {
                try {
                    const hasError = await entity.validateRules(this.values[name])
                    if (hasError) {
                        break
                    }
                } catch(e) {
                    console.info(`Unknow Error in validateFields: ${e}`)
                    break
                }
            }
        }

        return new Promise((resolve, reject) => {
            const errorKeys = Object.keys(this.errors)

            if (errorKeys.length) {
                reject({ ...this.errors })
            } else {
                resolve({ ...this.values })
            }
        })
    }
}

export function useForm<Values = ValueType>(): [FormInstance<Values>] {
    const formRef = useRef<FormInstance<Values>>()

    if (!formRef.current) {
        const formStore = new FormStore()
        formRef.current = formStore.getForm<Values>()
    }

    return [formRef.current]
}