import { IPickerPanelProps } from '../picker-panel/interface'

// 最多支持三层
export interface IOption {
    label: string;
    value: string;
}

export interface IOptionWithChildren {
    label: string;
    value: string;
    children?: {
        label: string,
        value: string,
        children?: {
            label: string,
            value: string,
            children?: IOption[],
        }[],
    }[];
}

export interface ITreePickerProps extends Omit<IPickerPanelProps, 'value' | 'onConfirm' | 'onSearch' | 'title'> {
    value?: string[];
    options?: IOptionWithChildren[];
    title?: string | [string | undefined, string | undefined, string | undefined];
    onConfirm?: (value: string[], labels: string[]) => void;
}

export interface IOnSearchProps {
    onSearch?: (val: string) => void;
}
