import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import { Modal } from './Modal';
import { omit } from '../../utils';
let sibling = null;
export const confirm = (config) => {
    if (sibling || !config)
        return;
    if (config.onVisibleChange) {
        config.onVisibleChange(true);
    }
    sibling = new RootSiblings(React.createElement(Modal, Object.assign({}, omit(config, ['content', 'onCancel', 'onOk', 'onVisibleChange']), { onCancel: () => {
            if (sibling) {
                sibling.destroy();
            }
            if (config.onCancel) {
                config.onCancel();
            }
            if (config.onVisibleChange) {
                config.onVisibleChange(false);
            }
            sibling = null;
        }, onOk: () => {
            if (sibling) {
                sibling.destroy();
            }
            if (config.onOk) {
                config.onOk();
            }
            if (config.onVisibleChange) {
                config.onVisibleChange(false);
            }
            sibling = null;
        }, onRequestClose: () => {
            if (sibling) {
                sibling.destroy();
                sibling = null;
            }
            if (config.onVisibleChange) {
                config.onVisibleChange(false);
            }
        }, visible: true }), config.content));
};
