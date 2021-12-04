var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useRef } from 'react';
import { HOOK_MARK } from './contexts';
import { warning, isUndefined } from '../../utils';
export class FormStore {
    constructor() {
        this.getForm = () => {
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
        };
        this.getInternalHooks = (mark) => {
            if (mark === HOOK_MARK) {
                return {
                    registerField: this.registerField,
                    unregisterField: this.unregisterField,
                    getForm: this.getForm,
                    setFieldError: this.setFieldError,
                    setInitialValue: this.setInitialValue,
                    removeFieldError: this.removeFieldError
                };
            }
            warning(false, '`getInternalHooks` is internal usage. Should not call directly.');
            return null;
        };
        this.setInitialValue = (field, initialValue) => {
            if (!isUndefined(initialValue)) {
                this.initialValues[field] = initialValue;
                this.setFieldValue(field, initialValue);
            }
        };
        this.registerField = (fieldEntity) => {
            this.fieldEntities.push(fieldEntity);
        };
        this.unregisterField = (fieldEntity) => {
            this.fieldEntities = this.fieldEntities.filter(f => f !== fieldEntity);
        };
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
        this.removeFieldError = this.removeFieldError.bind(this);
    }
    notifyObservers(prevValues, fields = [], force = false) {
        this.fieldEntities.forEach(entity => {
            const shouldUpdate = entity.props.shouldUpdate;
            if (force) {
                entity.reRender();
            }
            else if (fields.includes(entity.props.name)) {
                entity.reRender();
            }
            else if (typeof shouldUpdate === 'function' && shouldUpdate(prevValues, Object.assign({}, this.values))) {
                entity.reRender();
            }
            else if (shouldUpdate) {
                entity.reRender();
            }
        });
    }
    getFieldsValue(fields) {
        if (fields == null) {
            return Object.assign({}, this.values);
        }
        return fields.reduce((values, field) => {
            values[field] = this.values[field];
            return values;
        }, {});
    }
    getFieldValue(field) {
        if (field == null) {
            return;
        }
        return this.values[field];
    }
    getFieldError(field) {
        return this.errors[field];
    }
    getFieldsError(fields) {
        if (!fields || !fields.length)
            return {};
        return fields.reduce((errors, field) => {
            const error = this.errors[field];
            if (error) {
                errors[field] = error;
            }
            return errors;
        }, {});
    }
    resetFields(fields) {
        const prevValues = Object.assign({}, this.values);
        if (fields == null) {
            this.values = Object.assign({}, this.initialValues);
        }
        else {
            fields.forEach(field => {
                this.values[field] = this.initialValues[field];
            });
        }
        this.notifyObservers(prevValues, undefined, true);
    }
    setFieldsValue(values) {
        if (values == null) {
            return;
        }
        const prevValues = Object.assign({}, this.values);
        this.values = Object.assign(Object.assign({}, this.values), values);
        this.notifyObservers(prevValues, Object.keys(values));
    }
    setFieldValue(field, value) {
        if (field == null) {
            return;
        }
        const prevValues = Object.assign({}, this.values);
        this.values[field] = value;
        this.notifyObservers(prevValues, [field]);
    }
    setFieldError(field, message) {
        this.errors[field] = message;
    }
    removeFieldError(field) {
        delete this.errors[field];
    }
    validateFields(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            let fieldEntities;
            if (fields) {
                fieldEntities = this.fieldEntities.filter(entity => fields.includes(entity.props.name));
            }
            else {
                fieldEntities = [...this.fieldEntities];
            }
            for (const entity of fieldEntities) {
                const { name } = entity.props;
                if (name) {
                    yield entity.validateRules(this.values[name]);
                }
            }
            return new Promise((resolve, reject) => {
                const errorKeys = Object.keys(this.errors);
                if (errorKeys.length) {
                    reject(Object.assign({}, this.errors));
                }
                else {
                    resolve(Object.assign({}, this.values));
                }
            });
        });
    }
}
export function useForm() {
    const formRef = useRef();
    if (!formRef.current) {
        const formStore = new FormStore();
        formRef.current = formStore.getForm();
    }
    return [formRef.current];
}
