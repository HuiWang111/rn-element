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
            onBlur={() => {
                Toast.show(typeof value);
            }}
        />
    );
}
```

## 说明
- 与 `Input` 使用方式基本无差别，但有以下两点区别
    1. 只能输入数字，其他无法输入
    2. `onBlur`时会自动将值转换为`number`类型

