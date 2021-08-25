import { ComponentType } from 'react';
import ListWithModal from '../ListWithModal';
import ListWithForm from '../ListWithForm';
import { NumberInputDemo } from '../NumberInput';
import PickerDemo from '../Picker';
import { BasicPickerExample } from '../RNPicker';

interface IRouteConfig {
    path: string;
    component: ComponentType;
}

export const routeConfig: IRouteConfig[] = [
    { path: 'list-with-modal', component: ListWithModal },
    { path: 'list-with-form', component: ListWithForm },
    { path: 'number-input-demo', component: NumberInputDemo },
    { path: 'picker-demo', component: PickerDemo },
    { path: 'rn-picker-demo', component: BasicPickerExample }
];
