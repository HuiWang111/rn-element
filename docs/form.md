## 示例
```tsx
import { FC } from 'react';
import { Form } from 'rn-element';
import { Input, Button, Switch } from 'react-native-elements';

const { useForm, Item: FormItem } = Form;

const FormDemo: FC = () => {
    const [form] = useForm();
    const handleSubmit = () => {
        const values = form.getFieldsValue();
        console.log(values);
    }

    return (
        <Form
            form={form}
            wrapperCol={{
                span: 16
            }}
            labelCol={{
                span: 4,
                offset: 4
            }}
            initialValues={{
                name: '张三',
                mobile: '13765423189'
            }}
        >
            <FormItem
                label='姓名'
                name='name'
                rules={[
                    { type: 'string', required: true }
                ]}
            >
                <Input />
            </FormItem>
            <FormItem
                label='电话'
                name='mobile'
                rules={[
                    { type: 'string', required: true }
                ]}
            >
                <Input />
            </FormItem>
            <View>
                <Button onPress={handleSubmit} title='提交' />
            </View>
        </Form>
    );
}
```

## Form Props

### initialValues
表单默认值，只有初始化以及重置时生效。如果Form和Form.Item都带这个属性，以Form的为准
| type | default |
| ---- | ---- |
| object | none |

### form
经 Form.useForm() 创建的 form 控制实例
| type | default |
| ---- | ---- |
| FormInstance | none |

### style
form容器的style属性
| type | default |
| ---- | ---- |
| ViewStyle | none |

### validateTrigger
统一设置字段触发验证的时机
| type | default |
| ---- | ---- |
| `onChange` `onBlur` | `onChange` |

### labelCol
label标签布局，如 { span: 3, offset: 12 }
| type | default |
| ---- | ---- |
| object | none |

### wrapperCol
需要为输入控件设置布局样式时，使用该属性，用法同 labelCol


## Form.Item Props

### initialValue
设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准
| type | default |
| ---- | ---- |
| any | none |

### label
label 标签的文本
| type | default |
| ---- | ---- |
| string | none |

### labelAlign
标签文本对齐方式
| type | default |
| ---- | ---- |
| `left` `center` `right` | `right` |

### name
字段名，必填项
| type | default |
| ---- | ---- |
| string | none |

### valuePropName
子节点值的属性
| type | default |
| ---- | ---- |
| string | 'value' |

### changeMethodName
子节点change函数名称，如Switch是 `onValueChange`
| type | default |
| ---- | ---- |
| string | 'onChangeText' |

### rules
子节点校验规则
| type | default |
| ---- | ---- |
| object | none |

### validateTrigger
设置字段触发验证的时机，如果与Form的validateTrigger冲突，Form.Item的优先级更高
| type | default |
| ---- | ---- |
| `onChange` `onBlur` | `onChange` |

### labelCol
label标签布局，如 { span: 3, offset: 12 }，如果与Form的冲突，以Form.Item的为准
| type | default |
| ---- | ---- |
| object | none |

### wrapperCol
需要为输入控件设置布局样式时，使用该属性，用法同 labelCol

## rules
以下参数可以去[ant-form](https://ant.design/components/form-cn/)的文档查看具体的含义
ant有但是这里没列举的参数表示还未支持
- type
    - 'string'
    - 'string'
    - 'number'
    - 'boolean'
    - 'integer'
    - 'float'
    - 'array'
    - 'enum'
    - 'any'
- enum
- len
- max
- min
- message
- pattern
- required
- transform
- validator
```ts
const rules = [{
    validator: (rule, value) => {
        if (value > 5) {
            return Promise.reject('年龄不能大于5');
        }
        return Promise.resolve();
    }
}]
```
- whitespace
