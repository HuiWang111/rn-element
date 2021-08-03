## 示例
```tsx
import React, { FC, useState } from 'react';
import { Modal } from 'rn-element';

const ModalDemo = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Modal
            title='modal title'
            onCancel={() => setModalVisible(false)}
            onOk={() => console.info('onOk')}
            onRequestClose={() => setModalVisible(false)}
            visible={modalVisible}
            okText='confirm'
            cancelText='cancel'
        >
            content
        </Modal>
    );
}
```