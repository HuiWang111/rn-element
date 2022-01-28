import { KeyCode } from '../constants';
export function defaultPickerLabelRender(labels) {
    return labels.join(' / ');
}
export function defaultFilterOption(keyword, option) {
    return option.label.includes(keyword);
}
export const defaultArray = [];
export const defaultObject = {};
export const defaultPageFnKeyMap = {
    F1: KeyCode.Z,
    F2: KeyCode.X,
    F3: KeyCode.C,
    F4: KeyCode.V
};
