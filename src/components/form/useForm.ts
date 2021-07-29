import {
    FormInstance,
    StoreValue,
    ValueType,
    IFormStore,
    IFieldEntity,
    InternalHooks
} from './interface';
import { useRef } from 'react';
import { HOOK_MARK } from './contexts';
import { warning, isUndefined } from '../../utils';

export class FormStore implements IFormStore, InternalHooks {
    private values: StoreValue;
    private initialValues: StoreValue;
    private errors: Record<string, string>;
    private fieldEntities: IFieldEntity[];

    constructor() {
        this.values = {};
        this.initialValues = {};
        this.errors = {};
        this.fieldEntities = [];

        this.getFieldsValue = this.getFieldsValue.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.setFieldsValue = this.setFieldsValue.bind(this);
        this.setFieldValue = this.setFieldValue.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.getFieldError = this.getFieldError.bind(this);
        this.getFieldsError = this.getFieldsError.bind(this);
        this.setFieldError = this.setFieldError.bind(this);
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
        };
    }

    getInternalHooks = (mark?: string): InternalHooks | null => {
        if (mark === HOOK_MARK) {
            return {
                registerField: this.registerField,
                getForm: this.getForm,
                setFieldError: this.setFieldError,
                setInitialValue: this.setInitialValue,
                removeFieldError: this.removeFieldError
            };
        }

        warning(false, '`getInternalHooks` is internal usage. Should not call directly.');
        return null
    }

    setInitialValue = (field: string, initialValue: ValueType): void => {
        if (!isUndefined(initialValue)) {
            this.initialValues[field] = initialValue;
            this.setFieldValue(field, initialValue);
        }
    }

    registerField = (fieldEntity: IFieldEntity): void => {
        this.fieldEntities.push(fieldEntity);
    };

    getFieldsValue(fields?: string[]): StoreValue {
        if (fields == null) {
            return { ...this.values };
        }

        return fields.reduce((values: Record<string, any>, field) => {
            values[field] = this.values[field];
            return values;
        }, {});
    }

    getFieldValue(field?: string): ValueType {
        if (field == null) {
            return;
        }

        return this.values[field];
    }

    getFieldError(field: string): string | undefined {
        return this.errors[field];
    }

    getFieldsError(fields?: string[]): Record<string, string> {
        if (!fields || !fields.length) return {}

        return fields.reduce((errors: Record<string, any>, field) => {
            const error = this.errors[field];
            if (error) {
                errors[field] = error;
            }
            return errors;
        }, {})
    }

    resetFields(fields?: string[]): void {
        if (fields == null) {
            this.values = { ...this.initialValues };
            this.fieldEntities.forEach(entity => entity.reRender());
            return;
        }

        fields.forEach(field => {
            this.values[field] = this.initialValues[field];
        });
        this.fieldEntities.forEach(entity => entity.reRender());
    }

    setFieldsValue(values?: StoreValue): void {
        if (values == null) {
            return;
        }

        this.values = { ...this.values, ...values };
        this.fieldEntities.forEach(entity => entity.reRender());
    }

    setFieldValue(field: string, value: ValueType): void {
        if (field == null) {
            return;
        }
        this.values[field] = value;
        this.fieldEntities.some(entity => {
            if (entity.props.name === field) {
                entity.reRender();
                return true;
            }
            return false;
        })
    }

    setFieldError(field: string, message: string): void {
        this.errors[field] = message;
    }

    removeFieldError(field: string): void {
        delete this.errors[field];
    }

    async validateFields(fields?: string[]): Promise<ValueType> {
        let fieldEntities;
        if (fields) {
            fieldEntities = this.fieldEntities.filter(entity => fields.includes(entity.props.name));
        } else {
            fieldEntities = [...this.fieldEntities];
        }

        for (const entity of fieldEntities) {
            const { name } = entity.props;
            await entity.validateRules(this.values[name]);
        }

        return new Promise((resolve, reject) => {
            const errorKeys = Object.keys(this.errors);

            if (errorKeys.length) {
                reject({ ...this.errors });
            } else {
                resolve({ ...this.values });
            }
        });
    }
}

export function useForm<Values = ValueType>(): [FormInstance<Values>] {
    const formRef = useRef<FormInstance<Values>>();

    if (!formRef.current) {
        const formStore = new FormStore();
        formRef.current = formStore.getForm<Values>();
    }

    return [formRef.current];
}