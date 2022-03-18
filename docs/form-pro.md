<!--
 * @Autor: hui.wang
 * @Date: 2022-03-18 10:21:27
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-03-18 10:32:11
 * @emial: hui.wang@bizfocus.cn
-->
# Form组件的二次封装
`src/components/form` 组件在 `rn-element` 中的 `Form` `List` 组件基础上进行了二次封装，使其可以通过配置的方式构建表单。

## 代码示例
```tsx
import React, { FC, useRef } from 'react'
import { Form, IForm } from '@/components/index'
import { useServices } from '@/hooks/index'

const numbers = new Array(30).fill(undefined).map((_, index) => String(index + 1))
const options = numbers.map(n => {
    return {
        value: String(n),
        label: `选项${n}`,
        children: numbers.map(i => {
            return {
                value: `${n}-${i}`,
                label: `选项${n}-${i}`,
                children: numbers.map(v => {
                    return {
                        value: `${n}-${i}-${v}`,
                        label: `选项${n}-${i}-${v}`
                    }
                })
            }
        })
    }
})

const FormDemo: FC = () => {
    const { authService } = useServices()
    const formRef = useRef<IForm | null>(null)

    return <Form
        configuration={[
            {
                type: 'text',
                label: '用户名',
                activable: false,
                value: authService.getUser()?.username
            },
            {
                type: 'number-input',
                label: 'age',
                name: 'age',
                childrenProps: {
                    placeholder: '请输入年龄'
                },
                rules: [
                    { type: 'number', max: 100, min: 0, message: '年龄必须在1-100之间' }
                ],
                /**
                 * 将输入框中的值转换为 number类型再进行校验
                 * 通过formRef.current.form?.getFieldValue方法拿到的值也将是 number类型的
                 */
                numeric: true
            },
            {
                type: 'radio',
                label: '单选',
                name: 'radio',
                childrenProps: {
                    options: [
                        { label: '1', value: '1' },
                        { label: '2', value: '2' }
                    ]
                }
            },
            {
                type: 'checkbox',
                label: '多选',
                name: 'checkbox',
                childrenProps: {
                    options: [
                        { label: '1', value: '1' },
                        { label: '2', value: '2' }
                    ]
                }
            },
            {
                type: 'date-picker',
                label: '日期',
                name: 'date',
                childrenProps: {
                    placeholder: '请选择日期'
                }
            },
            {
                type: 'picker',
                label: '选择',
                name: 'select',
                childrenProps: {
                    placeholder: '请选择',
                    options: numbers.map(n => {
                        return {
                            label: `选项${n}`,
                            value: n
                        }
                    })
                }
            },
            {
                type: 'tree-picker',
                label: '选择',
                name: 'select',
                childrenProps: {
                    placeholder: '请选择',
                    options
                }
            },
            {
                type: 'switch',
                label: '是否开启',
                name: 'open'
            },
            /**
             * 一行两列文本展示方式
             */
            {
                type: 'columns',
                activable: false,
                columns: [
                    { label: '手机号码', value: '13755667788' },
                    { label: '邮箱', value: '123@qq.com' }
                ]
            },
            {
                type: 'input',
                label: '原密码',
                name: 'password',
                childrenProps: {
                    placeholder: '请输入原密码',
                    secureTextEntry: true
                },
                rules: [
                    { required: true, message: '请填写原密码' }
                ]
            },
            {
                type: 'input',
                label: '新密码',
                name: 'newpassword',
                childrenProps: {
                    placeholder: '请输入新密码',
                    secureTextEntry: true
                },
                rules: [
                    { required: true, message: '请填写新密码' },
                    { type: 'string', min: 6, max: 20, message: '新密码至少6个字符，最大不能超过20个字符' }
                ]
            },
            {
                type: 'input',
                label: '确认密码',
                name: 'confirmPassword',
                childrenProps: {
                    placeholder: '请输入确认密码',
                    secureTextEntry: true
                },
                rules: [
                    { required: true, message: '请填写确认密码' },
                    ({ getFieldValue }) => {
                        return {
                            validator: (rule, value) => {
                                if (value !== getFieldValue('newpassword')) {
                                    return Promise.reject('新密码和确认密码不一致')
                                }
                                return Promise.resolve()
                            }
                        }
                    }
                ]
            }
        ]}
        style={{
            height,
            flexGrow: 0,
            backgroundColor: '#fff'
        }}
        labelCol={{
            span: 4
        }}
        wrapperCol={{
            span: 18,
            offset: 1
        }}
        ref={formRef}
        validateTrigger='onBlur'
    />
}
```

## Props
同时支持 `rn-elenemt` 中 [Form组件](https://github.com/HuiWang111/rn-element/blob/main/docs/form.md) 除form属性以外的所有props

- configuration
`Form`下子元素的配置

| type | default | required |
| ---- | ---- | ---- |
| (IFormConfiguration or IColumnsConfiguration)[] | none | true |

- keyboard
是否受键盘控制

| type | default | required |
| ---- | ---- | ---- |
| boolean | true | false |

- nextOnEnter
是否开启按回车进入下一行

| type | default | required |
| ---- | ---- | ---- |
| boolean | true | false |

- ref
可以通过ref拿到 form实例对象来进行对数据的获取、设置、检验等

## Types
- IFormConfiguration
```ts
import type {
    IFormItemProps as IBaseFormItemProps,
    IInputProps,
    INumberInputProps,
    ISwitchProps,
    IRadioProps,
    ICheckboxProps,
    IPickerProps,
    ITreePickerProps,
    IAsyncTreePickerProps,
    IDatePickerProps,
    IFormProps as IBaseFormProps,
    FormInstance
} from 'rn-element'
import { Dayjs } from 'dayjs'
import type { ReactNode } from 'react'

export interface IFormConfiguration extends Omit<IBaseFormItemProps, 'initialValue'> {
    type?: 'text'
        | 'input'
        | 'number-input'
        | 'switch'
        | 'radio'
        | 'checkbox'
        | 'picker'
        | 'tree-picker'
        | 'async-tree-picker'
        | 'date-picker';
    childrenProps?: TextProps
        | IInputProps
        | INumberInputProps
        | ISwitchProps
        | IRadioGroupProps
        | ICheckboxGroupProps
        | IPickerProps
        | ITreePickerProps
        | IAsyncTreePickerProps
        | IDatePickerProps<Dayjs>;
    /**
     * type中没有需要的组件，可以使用render方法自定义渲染内容
     * render函数的优先级大于 type
     */
    render?: () => ReactNode;
    /**
     * 该行是否可高亮
     */
    activable?: boolean;
    /**
     * 表单字段名称
     */
    name?: string;
    /**
     * 表单值，只有type='text'时必传，其他type可以通过 Form组件的initialValues来定义
     * 注意：这里的value指的是 defaultValue
     * 获取值使用 formRef.current.form?.getFieldValue('name')
     * 更新值使用 formRef.current.form?.setFieldValue('name', value)
     */
    value?: any;
    /**
     * 是否自动聚焦输入框
     */
    autoFocus?: boolean;
}
```

- IColumnsConfiguration
```ts
/**
 * 一行显示多列的配置
 */
export interface IColumnsConfiguration {
    type: 'columns';
    activable?: boolean;
    /**
     * PDA屏幕较小，限制每行最多两列
     */
    columns: [IColumnConfiguration, IColumnConfiguration];
}
```

- IColumnConfiguration
```ts
export interface IColumnConfiguration {
    textProps?: TextProps;
    label?: string;
    value: any;
}
```

## 源码
```tsx
// form.tsx
import React, {
    useState,
    ReactNode,
    FC,
    forwardRef,
    ForwardedRef,
    useImperativeHandle,
    RefAttributes,
    ComponentType
} from 'react'
import {
    Input,
    NumberInput,
    Switch,
    Radio,
    Checkbox,
    Picker,
    TreePicker,
    AsyncTreePicker,
    DatePicker,
    Form as BaseForm,
    List,
    useEnter
} from 'rn-element'
import type {
    IAsyncTreePickerProps,
    IInputProps,
    INumberInputProps,
    ISwitchProps,
    IRadioGroupProps,
    ICheckboxGroupProps,
    IPickerProps,
    ITreePickerProps,
    IDatePickerProps
} from 'rn-element'
import type { IOption } from 'rn-element/dist/components/picker/interface'
import type { Dayjs } from 'dayjs'
import type {
    IFormProps,
    IFormConfiguration,
    IForm,
    IColumnsConfiguration,
    IColumnConfiguration
} from './interface'
import {
    baseItemActiveStyle,
    baseItemStyle
} from '@/styles/index'
import { Text, TextProps } from 'react-native'

export const Form: FC<IFormProps & RefAttributes<IForm>> = forwardRef(({
    configuration,
    keyboard,
    style,
    nextOnEnter = true,
    ...restProps
}: IFormProps, ref: ForwardedRef<IForm>) => {
    const [index, setIndex] = useState(() => {
        return configuration.findIndex(c => typeof c.activable === 'undefined' || c.activable === true)
    })
    const [form] = BaseForm.useForm()
    const [panelVisible, setPanelVisible] = useState(false)

    useImperativeHandle<any, IForm>(ref, () => ({ form }), [form])

    useEnter(() => {
        if (!nextOnEnter) {
            return
        }

        if (index < configuration.length - 1) {
            setIndex(index + 1)
        }
    }, [nextOnEnter, index, configuration])

    const renderChildren = (
        type: IFormConfiguration['type'],
        childrenProps: IFormConfiguration['childrenProps'],
        render: IFormConfiguration['render'],
        value: any
    ): ReactNode => {
        if (render) {
            const children = render()
            if (typeof children === 'string') {
                return <Text numberOfLines={1} {...childrenProps as TextProps}>{children}</Text>
            }
            return children
        }

        switch (type) {
            case 'text': 
                return <Text numberOfLines={1} {...childrenProps as TextProps}>{value}</Text>
            case 'input': 
                return <Input {...childrenProps as IInputProps} />
            case 'number-input': 
                return <NumberInput {...childrenProps as INumberInputProps} />
            case 'switch': 
                return <Switch {...childrenProps as ISwitchProps} />
            case 'radio': {
                const props = childrenProps as (IRadioGroupProps & { options?: IOption[], })
                return (
                    <Radio.Group {...props}>
                        {
                            props.options?.map(({ value, label }) => {
                                return (
                                    <Radio key={value} value={value}>
                                        <Text style={{ color: '#000000d9', fontSize: 14 }}>{label}</Text>
                                    </Radio>
                                )
                            })
                        }
                    </Radio.Group>
                )
            }
            case 'checkbox': {
                const props = childrenProps as (ICheckboxGroupProps & { options?: IOption[], })
                return (
                    <Checkbox.Group {...props}>
                        {
                            props.options?.map(({ value, label }) => {
                                return (
                                    <Checkbox key={value} value={value}>
                                        <Text style={{ color: '#000000d9', fontSize: 14 }}>{label}</Text>
                                    </Checkbox>
                                )
                            })
                        }
                    </Checkbox.Group>
                )
            }
            case 'picker': {
                const props = childrenProps as IPickerProps
                return (
                    <Picker
                        {...props}
                        panelProps={{
                            ...props.panelProps,
                            itemStyle: baseItemStyle,
                            activeItemStyle: baseItemActiveStyle
                        }}
                        onVisibleChange={visible => {
                            setPanelVisible(visible)
                            props.onVisibleChange?.(visible)
                        }}
                    />
                )
            }
            case 'tree-picker': {
                const props = childrenProps as ITreePickerProps
                return (
                    <TreePicker
                        {...props}
                        panelProps={{
                            ...props.panelProps,
                            itemStyle: baseItemStyle,
                            activeItemStyle: baseItemActiveStyle
                        }}
                        onVisibleChange={visible => {
                            setPanelVisible(visible)
                            props.onVisibleChange?.(visible)
                        }}
                    />
                )
            }
            case 'async-tree-picker': {
                const props = childrenProps as IAsyncTreePickerProps
                return (
                    <AsyncTreePicker
                        {...props}
                        panelProps={{
                            ...props.panelProps,
                            itemStyle: baseItemStyle,
                            activeItemStyle: baseItemActiveStyle
                        }}
                        onVisibleChange={visible => {
                            setPanelVisible(visible)
                            props.onVisibleChange?.(visible)
                        }}
                    />
                )
            }
            case 'date-picker': 
                return <DatePicker {...childrenProps as IDatePickerProps<Dayjs>} />
        }
    }
    const getValuePropName = (type: IFormConfiguration['type']): 'value' | 'checked' => {
        if (type === 'switch') {
            return 'checked'
        }
        return 'value'
    }
    const getChangeMethodName = (type: IFormConfiguration['type']): 'onChange' | 'onChangeText' => {
        if (type?.includes('input')) {
            return 'onChangeText'
        }
        return 'onChange'
    }
    const getInputComponent = (type: IFormConfiguration['type']): ComponentType | undefined => {
        switch (type) {
            case 'input': 
                return Input
            case 'number-input': 
                return NumberInput
            case 'picker': 
                return Picker
            case 'tree-picker': 
                return TreePicker
            case 'async-tree-picker': 
                return AsyncTreePicker as ComponentType
            case 'date-picker': 
                return DatePicker
        }
    }
    const renderNonColumnRow = (config: IFormConfiguration) => {
        const {
            type,
            childrenProps,
            render,
            activable,
            name,
            value,
            autoFocus,
            ...rest
        } = config
        const isActivable = activable ?? true
        const formItem = (
            <BaseForm.Item
                {...rest}
                name={name}
                labelTextStyle={{ color: '#000' }}
                labelAlign='left'
                wrapperStyle={{ alignItems: 'flex-start' }}
                valuePropName={getValuePropName(type)}
                changeMethodName={getChangeMethodName(type)}
            >
                { renderChildren(type, childrenProps || {}, render, value) }
            </BaseForm.Item>
        )

        if (isActivable) {
            return (
                <List.ActivableItem
                    key={name ?? value}
                    autoFocus={autoFocus ?? true}
                    inputComponent={getInputComponent(type)}
                >
                    { formItem }
                </List.ActivableItem>
            )
        }

        return (
            <List.Item key={name ?? value}>
                { formItem }
            </List.Item>
        )
    }
    const renderColumns = (columns: IColumnConfiguration[]) => {
        return columns.map(column => {
            const { textProps, label, value } = column

            return (
                <BaseForm.Item
                    key={value || label}
                    label={label}
                    style={{ flex: 1 }}
                    // offset设置为2 可以和单行的对齐
                    wrapperCol={{ span: 13, offset: 2 }}
                    labelCol={{ span: 8 }}
                    labelTextStyle={{ color: '#000' }}
                    labelAlign='left'
                    wrapperStyle={{ alignItems: 'flex-start' }}
                >
                    <Text numberOfLines={1} {...(textProps || {})}>{value}</Text>
                </BaseForm.Item>
            )
        })
    }
    const renderColumnRow = (config: IColumnsConfiguration, index: number) => {
        const {
            activable,
            columns
        } = config
        const isActivable = activable ?? true

        if (isActivable) {
            return (
                <List.ActivableItem key={index} style={{ flexDirection: 'row' }}>
                    { renderColumns(columns) }
                </List.ActivableItem>
            )
        }

        return (
            <List.Item key={index} style={{ flexDirection: 'row' }}>
                { renderColumns(columns) }
            </List.Item>
        )
    }

    return (
        <BaseForm
            {...restProps}
            form={form}
        >
            <List
                activeIndex={index}
                onChange={setIndex}
                itemStyle={baseItemStyle}
                activeItemStyle={baseItemActiveStyle}
                keyboard={keyboard ?? !panelVisible}
                style={style}
            >
                {
                    configuration.map((config, index) => {
                        if (config.type === 'columns') {
                            return renderColumnRow(config, index)
                        }
                        return renderNonColumnRow(config)
                    })
                }
            </List>
        </BaseForm>
    )
})

Form.displayName = 'Form'
```

```tsx
// interface.ts
import type {
    IFormItemProps as IBaseFormItemProps,
    IInputProps,
    INumberInputProps,
    ISwitchProps,
    IRadioGroupProps,
    ICheckboxGroupProps,
    IPickerProps,
    ITreePickerProps,
    IAsyncTreePickerProps,
    IDatePickerProps,
    IFormProps as IBaseFormProps,
    FormInstance
} from 'rn-element'
import { Dayjs } from 'dayjs'
import type { ReactNode } from 'react'
import type { TextProps } from 'react-native'

export interface IFormConfiguration extends Omit<IBaseFormItemProps, 'initialValue'> {
    type?: 'text'
        | 'input'
        | 'number-input'
        | 'switch'
        | 'radio'
        | 'checkbox'
        | 'picker'
        | 'tree-picker'
        | 'async-tree-picker'
        | 'date-picker';
    childrenProps?: TextProps
        | IInputProps
        | INumberInputProps
        | ISwitchProps
        | IRadioGroupProps
        | ICheckboxGroupProps
        | IPickerProps
        | ITreePickerProps
        | IAsyncTreePickerProps
        | IDatePickerProps<Dayjs>;
    /**
     * type中没有需要的组件，可以使用render方法自定义渲染内容
     * render函数的优先级大于 type
     */
    render?: () => ReactNode;
    /**
     * 该行是否可高亮
     */
    activable?: boolean;
    /**
     * 表单字段名称
     */
    name?: string;
    /**
     * 表单值，推荐使用 Form组件的initialValues来定义
     * 注意：这里的value指的是 defaultValue
     * 获取值使用 formRef.current.form?.getFieldValue('name')
     * 更新值使用 formRef.current.form?.setFieldValue('name', value)
     */
    value?: any;
    /**
     * 是否自动聚焦输入框
     */
    autoFocus?: boolean;
}

export interface IColumnConfiguration {
    textProps?: TextProps;
    label?: string;
    value: any;
}

/**
 * 一行显示多列的配置
 */
export interface IColumnsConfiguration {
    type: 'columns';
    activable?: boolean;
    /**
     * PDA屏幕较小，限制每行最多两列
     */
    columns: [IColumnConfiguration, IColumnConfiguration];
}

export interface IFormProps extends Omit<IBaseFormProps, 'form'> {
    configuration: (IFormConfiguration | IColumnsConfiguration)[];
    keyboard?: boolean;
    nextOnEnter?: boolean;
}

export interface IForm {
    form: FormInstance;
}
```