import { ICheckListProps } from '../checkbox/interface';
export interface IRadioListProps extends Omit<ICheckListProps, 'value' | 'onChange'> {
    value?: string;
    onChange?: (value?: string) => void;
}
