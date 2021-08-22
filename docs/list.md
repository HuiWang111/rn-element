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
    const handleEnter = () => {
        // ...
    }

    return (
        <List
            activeIndex={activeIndex}
            onChange={handleChange}
            itemStyle={styles.item}
            activeItemStyle={styles.activeItem}
            onEnter={handleEnter}
            keyboard={true}
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

## 注意点
- List的children只能是 `List.Item` 和 `List.ActivableItem`，传入其他的会报错
- List内部使用 `ScrollView` 实现，使用的时候最好传入确定的高度

## List Props

### activeIndex
当前选中条目
| type | default | required |
| ---- | ---- | ---- |
| number | none | true |

### loop
是否循环
| type | default | required |
| ---- | ---- | ---- |
| boolean | true | false |

### style
List容器元素的样式
| type | default | required |
| ---- | ---- | ---- |
| object | none | false |

### itemStyle
`List.Item` 和 `List.ActivableItem` 元素的样式
| type | default | required |
| ---- | ---- | ---- |
| object | none | false |

### activeItemStyle
当前选中条目元素的样式
| type | default | required |
| ---- | ---- | ---- |
| object | none | false |

### keyboard
是否受键盘控制
| type | default | required |
| ---- | ---- | ---- |
| boolean | true | false |

### inputComponent
当List.Item设置 `autoFocus` 时，会对List.Item的children进行递归查找，查找到的第一个**type === inputComponent**的元素会被 `focus`。
默认查找的是 `react-native` 的TextInput，如果引入了其他组件库的Input，就可以通过设置这个属性修改查找的对象。
| type | default | required |
| ---- | ---- | ---- |
| ComponentType | TextInput | false |

### onChange
activeIndex发生变化时的回调
| type | default | required |
| ---- | ---- | ---- |
| Function | none | false |

## List.Item & List.ActivableItem Props
### style
`List.Item` 和 `List.ActivableItem` 元素的样式，与List的props `itemStyle` 重复时，以这个为准
| type | default | required |
| ---- | ---- | ---- |
| object | none | false |

### activeStyle
当前选中条目元素的样式，与List的pros `activeItemStyle` 重复时，以这个为准
| type | default | required |
| ---- | ---- | ---- |
| object | none | false |

### autoFocus
如果**List.Item**的chilren中有输入框且需要自动聚焦，那么就设置该属性为true
| type | default | required |
| ---- | ---- | ---- |
| boolean | false | false |

### inputComponent
同**List**的 `inputComponent` 属性，但优先级高于**List**的 `inputComponent`
| type | default | required |
| ---- | ---- | ---- |
| ComponentType | TextInput | false |

### onEnter
按回车键时的回调
| type | default | required |
| ---- | ---- | ---- |
| Function | none | false |