import { FormInstance, StoreValue, ValueType, IFormStore, IFieldEntity, InternalHooks } from './interface';
export declare class FormStore implements IFormStore, InternalHooks {
    private values;
    private initialValues;
    private errors;
    private fieldEntities;
    constructor();
    getForm: <V>() => FormInstance<V>;
    getInternalHooks: (mark?: string | undefined) => InternalHooks | null;
    setInitialValue: (field: string, initialValue: ValueType) => void;
    registerField: (fieldEntity: IFieldEntity) => void;
    getFieldsValue(fields?: string[]): StoreValue;
    getFieldValue(field?: string): ValueType;
    getFieldError(field: string): string | undefined;
    getFieldsError(fields?: string[]): Record<string, string>;
    resetFields(fields?: string[]): void;
    setFieldsValue(values?: StoreValue): void;
    setFieldValue(field: string, value: ValueType): void;
    setFieldError(field: string, message: string): void;
    removeFieldError(field: string): void;
    validateFields(fields?: string[]): Promise<ValueType>;
}
export declare function useForm<Values = ValueType>(): [FormInstance<Values>];
