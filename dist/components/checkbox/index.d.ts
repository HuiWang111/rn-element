import { Checkbox as InternalCheckbox } from './Checkbox';
import { CheckList } from './List';
import { CheckboxGroup } from './Group';
declare type InternalCheckboxType = typeof InternalCheckbox;
interface ICheckboxType extends InternalCheckboxType {
    List: typeof CheckList;
    Group: typeof CheckboxGroup;
}
declare const Checkbox: ICheckboxType;
export { Checkbox };
export type { ICheckListProps, ICheckboxProps, ICheckboxGroupProps } from './interface';
