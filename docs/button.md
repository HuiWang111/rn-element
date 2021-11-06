# Button

## 示例
```tsx
const ButtonDemo: FC = () => {
    const history = useHistory()

    return (
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
                    <ScrollView style={{ width, height: height - 60 }}>
                        <View>
                            <Button title='default' />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default' loading />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger loading />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' loading />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger loading />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default' disabled />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger disabled />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' disabled />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger disabled />
                        </View>
                    </ScrollView>
                )
            }
        </Page>
    )
}
```
[](https://github.com/HuiWang111/rn-element/blob/main/docs/assets/button.png)

## Props
### type
| type | default | required |
| ---- | ---- | ---- |
| `primary` `default` | `default` | false |

### danger
| type | default | required |
| ---- | ---- | ---- |
| boolean | false | false |

### title
| type | default | required |
| ---- | ---- | ---- |
| string | none | true |

### style
| type | default | required |
| ---- | ---- | ---- |
| ViewStyle | none | false |

### loading
| type | default | required |
| ---- | ---- | ---- |
| boolean | false | false |

### disabled
| type | default | required |
| ---- | ---- | ---- |
| boolean | false | false |

### spinnerStyle
| type | default | required |
| ---- | ---- | ---- |
| ViewStyle | none | false |

### onPress
| type | default | required |
| ---- | ---- | ---- |
| `() => void` | none | false |