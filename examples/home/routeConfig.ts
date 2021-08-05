import { ComponentType } from 'react';
import ListWithModal from '../ListWithModal';
import ListWithForm from '../ListWithForm';
import ListWithPicker from '../ListWithPicker';

interface IRouteConfig {
    path: string;
    component: ComponentType;
}

export const routeConfig: IRouteConfig[] = [
    { path: 'list-with-modal', component: ListWithModal },
    { path: 'list-with-form', component: ListWithForm },
    { path: 'list-with-picker', component: ListWithPicker }
];
