import type { IPickerPanelProps } from '../picker-panel'
import type { IPickerInputProps } from '../base'

export interface IOption {
    label: string;
    value: string;
}

export interface IPickerProps extends Omit<IPickerInputProps, 'onChange' | 'value'> {
    options?: IOption[];
    value?: string;
    defaultValue?: string;
    panelProps?: Omit<IPickerPanelProps, 'onConfirm' | 'visible'>;
    onChange?: (value: string) => void;
    onVisibleChange?: (visible: boolean) => void;
    filterOption?: (keyword: string, option: IOption) => boolean;
}

export interface IOnSearchProps {
    onSearch?: (val: string) => void;
}
