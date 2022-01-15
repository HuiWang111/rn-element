import { IPickerPanelProps } from '../picker-panel'

export interface IOption {
    label: string;
    value: string;
}

export interface IAsyncTreePickerProps extends Omit<IPickerPanelProps, 'value' | 'title' | 'onConfirm'> {
    value?: string[];
    options?: IOption[];
    title?: string | string[];
    depth: number;
    onNext?: (value: string, activeDepth: number, values: string[]) => Promise<void>;
    onPrevious?: (activeDepth: number) => Promise<void>;
    onConfirm?: (value: string[], labels: string[]) => void;
}
