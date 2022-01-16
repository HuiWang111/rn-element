import type { IPickerPanelProps } from '../picker-panel'
import type { IPickerInputProps } from '../base'

export interface IOption {
    label: string;
    value: string;
}

export interface IPickerProps extends Omit<IPickerInputProps, 'onChange' | 'value'> {
    onChange?: (value: string) => void;
    options?: IOption[];
    value?: string;
    defaultValue?: string;
    panelProps?: Omit<IPickerPanelProps, 'onConfirm' | 'visible'>;
    onVisibleChange?: (visible: boolean) => void;
}
