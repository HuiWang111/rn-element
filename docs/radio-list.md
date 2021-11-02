# RadioList

## 示例
```tsx
<RadioList
    value={checked}
    options={[
        {
            label: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一',
            value: 1
        },
        {
            label: '二二二二二二二二二二二二二二二二二二二二二二二二二二二二',
            value: 2
        },
        {
            label: '三三三三三三三三三三三三三三三三三三三三三三三三三三三三',
            value: 3,
            disabled: true
        },
        {
            label: '四四四四四四四四四四四四四四四四四四四四四四四四四四四四',
            value: 4
        }
    ]}
    onChange={handleChange}
/>
```

## Props
### value
| type | default | required |
| ---- | ---- | ---- |
| ReactText | none | false |

### options
| type | default | required |
| ---- | ---- | ---- |
| string[] or IRadioListOption[] | none | false |

### onChange
| type | default | required |
| ---- | ---- | ---- |
| Function | none | false |

## Interfaces
### IRadioListOption
```ts
interface IRadioListOption {
    label: string;
    value: ReactText;
    disabled?: boolean;
}
```