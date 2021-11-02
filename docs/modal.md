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
Modal.confirm(config);
```

## Modal.info
```ts
Modal.info(config);
```

## Modal.error
```ts
Modal.error(config);
```

## Modal.success
```ts
Modal.success(config);
```

## Modal.warning
```ts
Modal.warning(config);
```

## config
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

### **注意**
- Modal继承于 `react-native` 的Modal，所有`react-native` 的Modal属性都可以应用于该组件
- 使用 `Modal.confirm` 有前置条件，请参照 [toast](https://github.com/HuiWang111/rn-element/blob/main/docs/toast.md) 的前置条件