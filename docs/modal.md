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
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/modal.png)

## Modal.confirm
```ts
Modal.confirm(config);
```
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/modalConfirm.png)

## Modal.info
```ts
Modal.info(config);
```
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/modalInfo.png)

## Modal.error
```ts
Modal.error(config);
```
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/modalError.png)

## Modal.success
```ts
Modal.success(config);
```
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/modalSuccess.png)

## Modal.warning
```ts
Modal.warning(config);
```
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/modalConfirm.png)

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