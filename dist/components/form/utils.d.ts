import { ValueType, Rule, FormInstance } from './interface';
export declare function validateField(value: ValueType, form: FormInstance, name: string, rules?: Rule[]): Promise<[boolean, string]>;
export declare function genError(current: string | number, target: string | number, fieldName: string, validType: string): string;
