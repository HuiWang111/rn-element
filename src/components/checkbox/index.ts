import { Checkbox as InternalCheckbox } from './Checkbox'
import { CheckList } from './List'
import { CheckboxGroup } from './Group'

type InternalCheckboxType = typeof InternalCheckbox
interface ICheckboxType extends InternalCheckboxType {
    List: typeof CheckList;
    Group: typeof CheckboxGroup;
}

const Checkbox = InternalCheckbox as ICheckboxType;
Checkbox.Group = CheckboxGroup
Checkbox.List = CheckList

export { Checkbox }