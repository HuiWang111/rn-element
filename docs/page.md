## 示例
```tsx
<Page
    header={{
        center: <Text>Page</Text>,
        left: <Text>Left</Text>,
        right: <Text numberOfLines={1}>RightRightRightRight</Text>
    }}
    F1={{
        label: <Text>F1 返回</Text>,
        handler: () => {
            history.goBack();
        }
    }}
>
    {
        ({ width, height }) => (
            <List
                activeIndex={activeIndex}
                onChange={handleChange}
                style={{
                    ...styles.list,
                    width,
                    height: height - 30,
                    flexGrow: 0,
                    backgroundColor: '#fff'
                }}
                itemStyle={styles.item}
                activeItemStyle={styles.activeItem}
                keyboard={control}
            >
                {/* ... */}
            </List>
        )
    }
</Page>
```

## Props

### F1
F1按键label及事件
| type | default | required |
| ---- | ---- | ---- |
| [Fn](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#fn) | none | false |

### F2
F2按键label及事件
| type | default | required |
| ---- | ---- | ---- |
| [Fn](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#fn) | none | false |

### F3
F3按键label及事件
| type | default | required |
| ---- | ---- | ---- |
| [Fn](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#fn) | none | false |

### F4
F4按键label及事件
| type | default | required |
| ---- | ---- | ---- |
| [Fn](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#fn) | none | false |

### mockFn
是否使用其他键盘模拟F1-F4
| type | default | required |
| ---- | ---- | ---- |
| boolean | true | false |

### keyborad
是否监听键盘事件
| type | default | required |
| ---- | ---- | ---- |
| boolean | true | false |

### header
`Page` header部分
| type | default | required |
| ---- | ---- | ---- |
| null or [HeaderConfig](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#headerconfig) | none | false |

### mockFnKeyMap
模拟F1-F4的KeyCode，默认使用键盘的 `Z` `X` `C` `V`模拟
| type | default | required |
| ---- | ---- | ---- |
| [FnKeyMap](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#fnkeymap) | [defaultFnKeyMap](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#defaultfnkeymap) | false |

### headerStyle
`Page` header部分样式
| type | default | required |
| ---- | ---- | ---- |
| [HeaderStyle](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#headerstyle-1) | none | false |

### FnStyle
`Page` F1-F4按钮部分样式
| type | default | required |
| ---- | ---- | ---- |
| [FnStyle](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md#fnstyle-1) | none | false |

### style
| type | default | required |
| ---- | ---- | ---- |
| ViewStyle | none | false |

### children
children可以是一个函数，函数参数接受一个对象，里面包含了页面剩余可用的高度和宽度（目前宽度就是屏幕的宽度，高度是出去headr和F1-F4的高度）
| type | default | required |
| ---- | ---- | ---- |
| ReactNode or undefined or ((params: IChildrenParams) => ReactNode | undefined) | none | false |

## interface

### Fn
```ts
interface Fn {
    label: string | ReactNode;
    handler?: () => void;
}
```

### HeaderConfig
```ts
interface HeaderConfig {
    left?: string | null | ReactElement;
    center?: string | null | ReactElement;
    right?: string | null | ReactElement;
}
```

### FnKeyMap
```ts
interface FnKeyMap {
    F1?: number | number[];
    F2?: number | number[];
    F3?: number | number[];
    F4?: number | number[];
}
```

### HeaderStyle
```ts
interface HeaderStyle {
    left?: ViewStyle;
    center?: ViewStyle;
    right?: ViewStyle;
    container?: ViewStyle;
}
```

### FnStyle
```ts
interface FnStyle {
    bar: ViewStyle; // f1-f4整行的样式
    col: ViewStyle; // f1-f4每个单元格的样式
}
```

## default

### defaultFnKeyMap
```ts
{
    F1: KeyCode.Z,
    F2: KeyCode.X,
    F3: KeyCode.C,
    F4: KeyCode.V
}
```