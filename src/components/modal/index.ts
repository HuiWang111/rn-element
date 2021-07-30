import { Modal as InrernalModal } from './Modal';
import { confirm } from './confirm';
import { IModalConfig } from './interface';

type InternalModalType = typeof InrernalModal;

interface IModalType extends InternalModalType {
    confirm: (confirm: IModalConfig) => void;
}

const Modal = InrernalModal as IModalType;

Modal.confirm = confirm;

export { Modal };
