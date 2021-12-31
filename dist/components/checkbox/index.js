import { Checkbox as InternalCheckbox } from './Checkbox';
import { CheckList } from './List';
import { CheckboxGroup } from './Group';
const Checkbox = InternalCheckbox;
Checkbox.Group = CheckboxGroup;
Checkbox.List = CheckList;
export { Checkbox };
