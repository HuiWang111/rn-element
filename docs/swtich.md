# Switch

## 示例
```tsx
const handleChange = (checked: boolean) => {
    setChecked(checked);
}

<View style={{ width, height: height - 30, paddingHorizontal: 10 }}>
    <Switch checked={checked} onChange={handleChange} />
    <Switch checked={checked} onChange={handleChange} disabled style={{ marginTop: 10 }} />
</View>
```
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/switch.png)
![screenShot](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/switch-checked.png)

## Props
### checked
| type | default | required |
| ---- | ---- | ---- |
| boolean | false | false |

### disabled
| type | default | required |
| ---- | ---- | ---- |
| boolean | false | false |

### style
| type | default | required |
| ---- | ---- | ---- |
| ViewStyle | none | false |

### onChange
| type | default | required |
| ---- | ---- | ---- |
| Function | none | false |

### onPress
| type | default | required |
| ---- | ---- | ---- |
| Function | none | false |
