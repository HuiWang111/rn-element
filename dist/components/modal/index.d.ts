import { Modal as InrernalModal } from './Modal';
import { IModalConfig } from './interface';
declare type InternalModalType = typeof InrernalModal;
interface IModalType extends InternalModalType {
    confirm: (confirm: IModalConfig) => void;
    info: (confirm: IModalConfig) => void;
    warning: (confirm: IModalConfig) => void;
    success: (confirm: IModalConfig) => void;
    error: (confirm: IModalConfig) => void;
}
declare const Modal: IModalType;
export { Modal };
