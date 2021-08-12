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

## Modal.confirm
```ts
Modal.confin(config);
```

### config
```ts
interface ModalConfig {
    title?: string | JSX.Element;
    zIndex?: number;
    okText?: string;
    cancelText?: string;
    content?: string | JSX.Element;
    onCancel?: () => void;
    onOk?: () => void;
    onVisibleChange?: (visible: boolean) => void;
}
```