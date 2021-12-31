import { Radio as InternalRadio } from './Radio';
import { RadioList } from './List';
import { RadioGroup } from './Group';
const Radio = InternalRadio;
Radio.Group = RadioGroup;
Radio.List = RadioList;
export { Radio };
