import { Picker as InternalPicker } from './Picker';
import { PickerItem } from './PickerItem';
declare type InternalPickerType = typeof InternalPicker;
interface IPickerType extends InternalPickerType {
    Item: typeof PickerItem;
}
declare const Picker: IPickerType;
export { Picker };
