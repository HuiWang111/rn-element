import { ReactText } from 'react';
import { IPickerPanelProps } from '../picker-panel';
export interface IOption {
    label: string;
    value: ReactText;
}
export interface IAsyncTreePickerProps extends Omit<IPickerPanelProps, 'value' | 'title' | 'onConfirm'> {
    value?: ReactText[];
    options?: IOption[];
    title?: string | string[];
    depth: number;
    onNext?: (value: ReactText, activeDepth: number, values: ReactText[]) => Promise<void>;
    onPrevious?: (activeDepth: number) => Promise<void>;
    onConfirm?: (value: ReactText[], labels: string[]) => void;
}
