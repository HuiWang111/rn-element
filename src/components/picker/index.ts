import { Picker as InternalPicker } from './Picker';
import { PickerItem } from './PickerItem';

type InternalPickerType = typeof InternalPicker;
interface IPickerType extends InternalPickerType {
    Item: typeof PickerItem;
}

const Picker = InternalPicker as IPickerType;
Picker.Item = PickerItem;

export { Picker };

export type { IPickerItem, IPickerProps } from './interface'
