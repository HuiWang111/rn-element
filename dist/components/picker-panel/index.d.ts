import { PickerPanel as InternalPickerPanel } from './PickerPanel';
import { PickerItem } from './PickerPanelItem';
declare type InternalPickerPanelType = typeof InternalPickerPanel;
interface IPickerPanelType extends InternalPickerPanelType {
    Item: typeof PickerItem;
}
declare const PickerPanel: IPickerPanelType;
export { PickerPanel };
export type { IPickerPanelItem, IPickerPanelProps } from './interface';
