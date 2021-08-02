import { ViewStyle } from 'react-native';
export declare type ValueType = any | any[];
export declare type StoreValue<Values = ValueType> = Record<string, Values>;
export declare type FormInstance<Values = ValueType> = {
    getFieldsValue: (fields?: string[]) => StoreValue<Values>;
    getFieldValue: (field?: string) => Values;
    resetFields: (fields?: string[]) => void;
    setFieldsValue: (values: StoreValue) => void;
    setFieldValue: (field: string, value: Values) => void;
    validateFields: (fields?: string[]) => Promise<Values>;
    getFieldError: (field: string) => string | undefined;
    getFieldsError: (fields?: string[]) => Record<string, string>;
    getInternalHooks: (mark?: string) => InternalHooks | null;
};
export declare type InternalHooks<Values = ValueType> = {
    registerField: (fieldEntity: IFieldEntity) => void;
    getForm: () => FormInstance;
    setFieldError: (field: string, message: string) => void;
    setInitialValue: (field: string, value: Values) => void;
    removeFieldError: (field: string) => void;
};
export interface IFormStore<Values = ValueType> extends FormInstance<Values> {
    getInternalHooks: () => InternalHooks | null;
}
declare type RuleType = 'string' | 'number' | 'boolean' | 'integer' | 'float' | 'array' | 'enum' | 'any';
export interface IRuleConfig<Values = ValueType> {
    type?: RuleType;
    enum?: any[];
    len?: number;
    max?: number;
    message?: string;
    min?: number;
    pattern?: RegExp;
    required?: boolean;
    transform?: (value: Values) => Values;
    validator?: (rule: IRuleConfig, value: Values) => Promise<void>;
    whitespace?: boolean;
}
export declare type Rule = IRuleConfig | ((form: FormInstance) => IRuleConfig);
export interface IFieldEntity {
    getControlled: (childProps: Record<string, any>) => void;
    reRender: () => void;
    validateRules: (value: ValueType) => Promise<void>;
    props: {
        name: string;
    };
}
export interface IFieldProps {
    name: string;
    rules: IRuleConfig[];
    valuePropName: string;
    changeMethodName: string;
    validateTrigger: ValidateTrigger;
    initialValue: ValueType;
    col?: ICol;
}
export declare type ValidateTrigger = 'onChange' | 'onBlur';
export interface IFormProps<Values = ValueType> {
    initialValues?: StoreValue;
    form: FormInstance<Values>;
    style?: ViewStyle;
    validateTrigger?: ValidateTrigger;
    labelCol?: ICol;
    wrapperCol?: ICol;
}
export interface IFormItemProps<Values = ValueType> {
    initialValue?: Values;
    label?: string;
    labelAlign?: LabelAlign;
    name: string;
    valuePropName?: string;
    changeMethodName?: string;
    rules?: Rule[];
    validateTrigger?: ValidateTrigger;
    labelCol?: ICol;
    wrapperCol?: ICol;
}
export declare type LabelAlign = 'left' | 'right' | 'center';
export interface IFormItemLabelProps {
    label: string;
    labelAlign?: LabelAlign;
    col?: ICol;
}
export interface ICol {
    span?: number;
    offset?: number;
}
export {};