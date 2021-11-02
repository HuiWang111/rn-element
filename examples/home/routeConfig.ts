import { ComponentType } from 'react';
import ListWithModal from '../ListWithModal';
import ListWithForm from '../ListWithForm';
// import { NumberInputDemo } from '../NumberInput';
import ReactNatviePickerDemo from '../ReactNatviePicker';
import PickerDemo from '../Picker';
import TreePickerDemo from '../TreePicker';
import { RadoList } from '../RadoList';

interface IRouteConfig {
    path: string;
    component: ComponentType;
}

export const routeConfig: IRouteConfig[] = [
    { path: 'list-with-modal', component: ListWithModal },
    { path: 'list-with-form', component: ListWithForm },
    // { path: 'number-input-demo', component: NumberInputDemo },
    { path: 'react-native-picker-demo', component: ReactNatviePickerDemo },
    { path: 'picker-demo', component: PickerDemo },
    { path: 'tree-picker-demo', component: TreePickerDemo },
    { path: 'radio-list', component: RadoList }
];
