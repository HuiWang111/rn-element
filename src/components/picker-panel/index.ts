import { PickerPanel as InternalPickerPanel } from './PickerPanel'
import { PickerItem } from './PickerPanelItem'

type InternalPickerPanelType = typeof InternalPickerPanel;
interface IPickerPanelType extends InternalPickerPanelType {
    Item: typeof PickerItem;
}

const PickerPanel = InternalPickerPanel as IPickerPanelType
PickerPanel.Item = PickerItem

export { PickerPanel }

export type { IPickerPanelItem, IPickerPanelProps } from './interface'
