# CheckList

## 示例
```tsx
<CheckList
    value={['1']}
    options={[
        {
            label: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一',
            value: '1'
        },
        {
            label: '二二二二二二二二二二二二二二二二二二二二二二二二二二二二',
            value: '2"
        },
        {
            label: '三三三三三三三三三三三三三三三三三三三三三三三三三三三三',
            value: '3',
            disabled: true
        },
        {
            label: '四四四四四四四四四四四四四四四四四四四四四四四四四四四四',
            value: '4'
        }
    ]}
    onChange={handleChange}
/>
```
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/radiolist.png)

## Props
### value
| type | default | required |
| ---- | ---- | ---- |
| string[] | none | false |

### options
| type | default | required |
| ---- | ---- | ---- |
| string[] or ICheckListOption[] | none | false |

### onChange
| type | default | required |
| ---- | ---- | ---- |
| Function | none | false |

## Interfaces
### ICheckListOption
```ts
interface ICheckListOption {
    label: string;
    value: string;
    disabled?: boolean;
}
```
