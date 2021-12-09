import { ICheckListProps } from '../checkbox/interface'

export interface IRadioListProps extends Omit<ICheckListProps, 'value' | 'onChange' | 'defaultValue'> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}