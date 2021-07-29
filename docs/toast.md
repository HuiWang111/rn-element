## 前置条件
使用该Toast需要在你的应用最外层使用RootSiblingParent包一下，`react-native-root-siblings` 包无需另外安装，当你安装了 `rn-element` 后node_modules中已经有了
```jsx
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
    return (
        <RootSiblingParent>
            <YourComponent></YourComponent>
        </RootSiblingParent>
    );
}
```
另外，还需要运行以下命令：
```shell
react-native link react-native-vector-icons
```

## 示例
```jsx
import { Toast } from 'rn-element';

const submit = async () => {
    try {
        await callApi();
        Toast.success('操作成功');
    } catch (e) {
        console.error(e);
        Toast.error('操作失败');
    }
}
```

## apis
### Toast.show
展示一个纯文字的Toast
```js
Toast.show(message, options); 
```

### Toast.success
展示一个带 `check` icon的Toast
```js
Toast.success(message, options); 
```

### Toast.error
展示一个带 `close` icon的Toast
```js
Toast.error(message, options); 
```

### Toast.warning
展示一个带 `warning` icon的Toast
```js
Toast.warning(message, options);
```

## options
详见[react-native-root-toast](https://github.com/magicismight/react-native-root-toast)
```ts
interface ShowToastOptions extends Record<string, unknown> {
    duration?: number;
    position?: number;
    shadow?: boolean;
    animation?: boolean;
    hideOnPress?: boolean;
    delay?: number;
    onShow?: () => void;
    onShown?: () => void;
    onHide?: () => void;
    onHidden?: () => void;
}
```