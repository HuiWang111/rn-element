## 前置条件
修改 `android/app/src/main/java/com/${your-project-name}/MainActivity.java` 文件
附上[原文链接](https://blog.csdn.net/weixin_42865887/article/details/81366129)
```java
import androidx.annotation.Nullable;
import android.view.KeyEvent;
 
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

    // 以下方法写在MainActivity类中
    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
        WritableMap params = Arguments.createMap();
        params.putInt("which", event.getKeyCode());
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            sendEvent(reactContext, "keydown", params);
        } else if (event.getAction() == KeyEvent.ACTION_UP) {
            sendEvent(reactContext, "keyup", params);
        }
        return super.dispatchKeyEvent(event);
    }
```

## 示例
```tsx
import React, { FC, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { List } from 'rn-element';

const ActiveListDemo: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    return (
        <List
            activeIndex={activeIndex}
            onChange={handleChange}
            itemStyle={styles.item}
            activeItemStyle={styles.activeItem}
        >
            <List.ActivableItem>
                <Text>1 - isActivable</Text>
            </List.ActivableItem>
            <List.Item>
                <Text>2</Text>
            </List.Item>
            <List.ActivableItem>
                <Text>3 - isActivable</Text>
            </List.ActivableItem>
            <List.Item>
                <Text>4</Text>
            </List.Item>
            <List.ActivableItem>
                <Text>5 - isActivable</Text>
            </List.ActivableItem>
        </List>
    );
}

export default ActiveListDemo;

const styles = StyleSheet.create({
    item: {
        height: 40,
        alignContent: 'center',
        paddingLeft: 20 
    },
    activeItem: {
        backgroundColor: 'yellow'
    }
});
```