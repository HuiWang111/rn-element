## 示例
```tsx
// isEnterable 默认为true可以不传，此处为了演示
<Enterable isEnterable={true} onEnter={() => console.log('onEnter')}>
    <Text>show picker</Text>
</Enterable>
```

## 概述
用 `Enterable` 组件包裹的元素，当 `isEnterable` 为 `true` 时，按回车可以触发回车事件

## Props

### isEnterable
| type | default | required |
| ---- | ---- | ---- |
| boolean | true | false |

### onEnter
| type | default | required |
| ---- | ---- | ---- |
| function | none | false |