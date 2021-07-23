import { Form as InternalForm } from './Form';
import { FormItem } from './FormItem';
import { useForm } from './useForm';

type InternalFormType = typeof InternalForm;
interface IFormType extends InternalFormType {
    Item: typeof FormItem;
    useForm: typeof useForm;
}

const Form = InternalForm as IFormType;

Form.Item = FormItem;
Form.useForm = useForm;

export { Form };
