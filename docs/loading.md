## 示例
```jsx
import { Loading } from 'rn-element';

const fetchList = async () => {
    try {
        Loading.show()
        await callApi();
    } catch (e) {
        console.error(e);
    } finally {
        Loading.hide();
    }
}
```