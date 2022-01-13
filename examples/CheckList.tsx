import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { useHistory } from 'react-router-native'
import { Checkbox, Page, ThemeProvider } from '../src'
import { colors } from '../src/utils'

const CheckList = Checkbox.List

export const CheckListDemo: FC = () => {
    const [checked, setChecked] = useState<string[]>([])
    const history = useHistory()

    const handleChange = (value) => {
        setChecked(value)
    }

    return (
        <ThemeProvider
            page={{
                headerBackgroundColor: colors.primary,
                headerTextColor: '#fff',
                bottomBackgroundColor: colors.primary,
                bottomTextColor: '#fff'
            }}
        >
            <Page
                header={{
                    center: 'Page',
                    left: 'Left',
                    right: 'Right'
                }}
                F1={{
                    label: 'F1 返回',
                    handler: () => {
                        history.goBack()
                    }
                }}
            >
                {
                    ({ width, height }) => (
                        <View style={{ width, height: height - 30 }}>
                            <CheckList
                                value={checked}
                                options={[
                                    {
                                        label: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一',
                                        value: '1'
                                    },
                                    {
                                        label: '二二二二二二二二二二二二二二二二二二二二二二二二二二二二',
                                        value: '2'
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
                        </View>
                    )
                }
            </Page>
        </ThemeProvider>
    )
}
