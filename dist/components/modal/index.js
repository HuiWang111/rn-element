import { Modal as InrernalModal } from './Modal';
import { confirm, info, warning, success, error } from './methods';
const Modal = InrernalModal;
Modal.confirm = confirm;
Modal.info = info;
Modal.warning = warning;
Modal.success = success;
Modal.error = error;
export { Modal };
