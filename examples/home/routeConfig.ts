import { ComponentType } from 'react';
import ListWithModal from '../ListWithModal';
import ListWithForm from '../ListWithForm';
// import { NumberInputDemo } from '../NumberInput';
import PickerDemo from '../Picker';
import TreePickerDemo from '../TreePicker';
import { RadoList } from '../RadoList';
import { FormDemo } from '../Form';
import { InputDemo } from '../Input';
import { ButtonDemo } from '../Button';
import { CheckListDemo } from '../CheckList'
import { SwitchDemo } from '../Switch'
import { TableDemo } from '../Table'
import { AsyncTreePickerDemo } from '../AsyncTreePicker'

interface IRouteConfig {
    path: string;
    component: ComponentType;
}

export const routeConfig: IRouteConfig[] = [
    { path: 'list-with-modal', component: ListWithModal },
    { path: 'list-with-form', component: ListWithForm },
    // { path: 'number-input-demo', component: NumberInputDemo },
    { path: 'picker-demo', component: PickerDemo },
    { path: 'tree-picker-demo', component: TreePickerDemo },
    { path: 'async-tree-picker-demo', component: AsyncTreePickerDemo },
    { path: 'radio-list', component: RadoList },
    { path: 'form-demo', component: FormDemo },
    { path: 'input-demo', component: InputDemo },
    { path: 'button-demo', component: ButtonDemo },
    { path: 'check-list', component: CheckListDemo },
    { path: 'switch', component: SwitchDemo },
    { path: 'table', component: TableDemo }
];
