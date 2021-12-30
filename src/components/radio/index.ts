import { Radio as InternalRadio } from './Radio'
import { RadioList } from './List'
import { RadioGroup } from './Group'

type InternalRadioType = typeof InternalRadio

interface IRadioType extends InternalRadioType {
    List: typeof RadioList;
    Group: typeof RadioGroup;
}

const Radio = InternalRadio as IRadioType;
Radio.Group = RadioGroup
Radio.List = RadioList

export { Radio }
 