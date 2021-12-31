import { Radio as InternalRadio } from './Radio';
import { RadioList } from './List';
import { RadioGroup } from './Group';
declare type InternalRadioType = typeof InternalRadio;
interface IRadioType extends InternalRadioType {
    List: typeof RadioList;
    Group: typeof RadioGroup;
}
declare const Radio: IRadioType;
export { Radio };
export type { IRadioGroupProps, IRadioListProps, IRadioProps } from './interface';
