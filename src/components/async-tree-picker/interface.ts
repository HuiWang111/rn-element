import type { IPickerPanelProps } from '../picker-panel'
import type { IPickerInputProps } from '../base'

export interface IOption {
    label: string;
    value: string;
}

export interface IAsyncTreePickerProps extends Omit<IPickerInputProps, 'value' | 'onChange' | 'defaultValue'> {
    value?: string[];
    defaultValue?: string[];
    options?: IOption[];
    title?: string | string[];
    depth: number;
    panelProps?: Omit<IPickerPanelProps, 'value' | 'title' | 'onConfirm'>;
    onNext?: (value: string, activeDepth: number, values: string[]) => Promise<void>;
    onPrevious?: (activeDepth: number) => Promise<void>;
    onChange?: (value: string[]) => void;
    onVisibleChange?: (visible: boolean) => void;
}
