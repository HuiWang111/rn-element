## 实例
```tsx
const NumberInputDemo: FC = () => {
    const [value, setValue] = useState<number | undefined>();
    const handleChange = (value) => {
        setValue(value);
    }

    return (
        <NumberInput
            placeholder='number-input'
            value={value}
            onChangeText={handleChange}
            negative={false}
            precision={3}
            max={3}
            min={1}
            onBlur={() => {
                Toast.show(typeof value);
            }}
        />
    );
}
```

## Props

### max
可输入的最大值，`value` 大于 `max` 时 `onChangeText` 不会被触发
| type | default | required |
| ---- | ---- | ---- |
| number | none | false |

### min
可输入的最小值，`value` 小于 `min` 时 `onChangeText` 不会被触发
| type | default | required |
| ---- | ---- | ---- |
| number | none | false |

### precision
可输入的小数位数，必须为整数时设为0即可
| type | default | required |
| ---- | ---- | ---- |
| number | 2 | false |

### negative
是否允许输入负数
| type | default | required |
| ---- | ---- | ---- |
| boolean | true | false |

### value
| type | default | required |
| ---- | ---- | ---- |
| number or undefined | none | false |

### onChangeText
输入值时的回调，改回调传递的 `value` 值为number(清空输入框时传递的是 `undefined`)
| type | default | required |
| ---- | ---- | ---- |
| function | none | false |

- **！！！注意**
    - 当允许输入小数且以小数点结尾时(如 `2.`)，`onChangeText` 回调中拿到的 `value` 是 `string` 类型的(原因是 `Number('2.') === 2` )
