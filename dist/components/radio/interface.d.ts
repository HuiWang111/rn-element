import { ReactText } from 'react';
export interface IRadioListOption {
    label: string;
    value: ReactText;
    disabled?: boolean;
}
export interface IRadioListProps {
    value?: ReactText;
    options?: ReactText[] | IRadioListOption[];
    onChange?: (value: ReactText) => void;
    activeColor?: string;
}
