import { Modal as InrernalModal } from './Modal';
import { confirm, info, warning, success, error } from './methods';
import { IModalConfig } from './interface';

type InternalModalType = typeof InrernalModal;

interface IModalType extends InternalModalType {
    confirm: (confirm: IModalConfig) => void;
    info: (confirm: IModalConfig) => void;
    warning: (confirm: IModalConfig) => void;
    success: (confirm: IModalConfig) => void;
    error: (confirm: IModalConfig) => void;
}

const Modal = InrernalModal as IModalType;

Modal.confirm = confirm;
Modal.info = info;
Modal.warning = warning;
Modal.success = success;
Modal.error = error;

export { Modal };

export type { IModalConfig, IModalProps } from './interface'
