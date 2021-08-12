import { ComponentType } from 'react';
import ListWithModal from '../ListWithModal';
import ListWithForm from '../ListWithForm';
import ListWithPicker from '../ListWithPicker';
import { NumberInputDemo } from '../NumberInput';

interface IRouteConfig {
    path: string;
    component: ComponentType;
}

export const routeConfig: IRouteConfig[] = [
    { path: 'list-with-modal', component: ListWithModal },
    { path: 'list-with-form', component: ListWithForm },
    { path: 'list-with-picker', component: ListWithPicker },
    { path: 'number-input-demo', component: NumberInputDemo }
];
