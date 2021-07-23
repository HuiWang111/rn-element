import { Form as InternalForm } from './Form';
import { FormItem } from './FormItem';
import { useForm } from './useForm';
const Form = InternalForm;
Form.Item = FormItem;
Form.useForm = useForm;
export { Form };
