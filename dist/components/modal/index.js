import { Modal as InrernalModal } from './Modal';
import { confirm } from './confirm';
const Modal = InrernalModal;
Modal.confirm = confirm;
export { Modal };
