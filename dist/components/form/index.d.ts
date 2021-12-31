import { Form as InternalForm } from './Form';
import { FormItem } from './FormItem';
import { useForm } from './useForm';
declare type InternalFormType = typeof InternalForm;
interface IFormType extends InternalFormType {
    Item: typeof FormItem;
    useForm: typeof useForm;
}
declare const Form: IFormType;
export { Form };
export type { FormInstance, IFormProps, IFormItemProps } from './interface';
