import { IPickerPanelProps } from '../picker-panel/interface'
import type { IPickerInputProps } from '../base'

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

export interface ITreePickerProps extends Omit<IPickerInputProps, 'value' | 'onChange' | 'defaultValue'> {
    value?: string[];
    defaultValue?: string[];
    options?: IOptionWithChildren[];
    title?: string | [string | undefined, string | undefined, string | undefined];
    panelProps?: Omit<IPickerPanelProps, 'value' | 'onConfirm' | 'onSearch' | 'title'>;
    onChange?: (value: string[]) => void;
    onVisibleChange?: (visible: boolean) => void;
    labelRender?: (labels: string[]) => string;
    filterOption?: (keyword: string, option: IOption) => boolean;
}

export interface IOnSearchProps {
    onSearch?: (val: string) => void;
}
