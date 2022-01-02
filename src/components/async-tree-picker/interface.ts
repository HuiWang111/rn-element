import { ReactText } from 'react'
import { IPickerProps } from '../picker'

export interface IOption {
    label: string;
    value: ReactText;
}

export interface IAsyncTreePickerProps extends Omit<IPickerProps, 'value' | 'title' | 'onConfirm'> {
    value?: ReactText[];
    options?: IOption[];
    title?: string | string[];
    depth: number;
    onNext?: (value: ReactText) => Promise<void>;
    onPrevious?: () => Promise<void>;
    onConfirm?: (value: ReactText[], labels: string[]) => void;
}
