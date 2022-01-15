import React, {
    Children,
    cloneElement,
    FC,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useState,
    useMemo
} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    StyleProp,
    ViewStyle,
    Text
} from 'react-native'
import { RootSiblingPortal } from 'react-native-root-siblings'
import { IPickerPanelProps } from './interface'
import { PickerFooter, Mask, Empty } from '../base'
import { PickerContext } from './context'
import { useArrowUp, useArrowDown, useTheme, useConfig } from '../../hooks'
import { isNumber, isString, omit } from '../../utils'
import { Input } from '../input'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const baseHeaderHeight = 40

/**
 * TODO: 
 * 1. 上下切换不触发onConfirm
 * 2. 点击item触发onConfirm
 * 3. 回车触发onConfirm
 * 4. 点击确认触发onConfirm
 */
export const PickerPanel: FC<PropsWithChildren<IPickerPanelProps>> = ({
    title,
    headerStyle,
    zIndex = 10,
    maskStyle,
    children,
    value: propsValue,
    activeItemStyle,
    itemStyle,
    visible = false,
    showSearch = false,
    searchInputProps,
    fullScreen = true,
    footerProps = {},
    confirmOnSelect = false,
    onSearch,
    onCancel,
    onConfirm
}: PropsWithChildren<IPickerPanelProps>) => {
    const theme = useTheme()
    const values = useMemo<string[]>(() => {
        return Children.map(children, (item: ReactElement) => {
            return item.props?.value
        }) || []
    }, [children])
    // const [value, setValue] = useState<string>(propsValue ?? (values[0] ?? ''))
    const [keyword, setKeyword] = useState<string>('')
    const { showSoftInputOnFocus } = useConfig()

    const containerWidth = useMemo(() => {
        return fullScreen ? screenWidth : screenWidth - 40
    }, [fullScreen])
    const containerHeight = useMemo(() => {
        return fullScreen ? screenHeight - 20 : screenHeight - 90
    }, [fullScreen])
    const headerHeight = useMemo<number>(() => {
        if (!title) {
            return 0
        }

        if (headerStyle && ('height' in headerStyle) && isNumber(headerStyle.height)) {
            return headerStyle.height
        }

        return baseHeaderHeight
    }, [title, headerStyle])
    const scrollViewStyle = useMemo(() => {
        const style: StyleProp<ViewStyle> & { height: number, } = {
            height: containerHeight - 50 - headerHeight
        }

        if (showSearch) {
            style.height -= 50
        }

        return style
    }, [showSearch, containerHeight, headerHeight])

    // useEffect(() => {
    //     setValue(propsValue ?? (values[0] ?? ''))
    // }, [propsValue, values])
    useArrowUp(() => {
        const index = values.findIndex(v => v === propsValue)
        
        if (index > 0) {
            onConfirm?.(values[index - 1])
        }
    }, [propsValue])
    useArrowDown(() => {
        const index = values.findIndex(v => v === propsValue)
        const maxIndex = values.length - 1
        
        if (index < maxIndex) {
            onConfirm?.(values[index + 1])
        }
    }, [propsValue])

    const resetState = () => {
        setKeyword('')
        onSearch?.('')
    }
    const handleConfirm = (): void => {
        // onConfirm?.(value)
        resetState()
    }
    const handleCancel = (): void => {
        onCancel?.()
        resetState()
    }
    const handleKeywordChange = (value: string) => {
        setKeyword(value)
        onSearch?.(value)
    }
    
    const renderItems = () => {
        if (Children.count(children) === 0) {
            return <Empty style={{ height: scrollViewStyle.height }} />
        }

        return (
            <PickerContext.Provider value={{ activeItemStyle, itemStyle, confirmOnSelect, onConfirm }}>
                {
                    Children.map(children, (item: ReactElement) => {
                        return cloneElement(item, {
                            isActive: propsValue === item.props?.value
                        })
                    })
                }
            </PickerContext.Provider>
        )
    }

    return (
        <RootSiblingPortal>
            <Mask
                zIndex={zIndex}
                style={maskStyle}
                visible={visible}
            >
                <View
                    style={[
                        styles.container,
                        {
                            width: containerWidth,
                            height: containerHeight
                        }
                    ]}
                >
                    {
                        title ? (
                            <View
                                style={[
                                    styles.header,
                                    {
                                        borderBottomColor: theme.border,
                                        borderBottomWidth: showSearch ? 1 : 0
                                    },
                                    headerStyle
                                ]}
                            >
                                {
                                    isString(title) ? (
                                        <Text style={styles.title}>{title}</Text>
                                    ) : title
                                }
                            </View>
                        ) : null
                    }
                    {
                        showSearch
                            ? (
                                <View style={styles.searchContainer}>
                                    <Input
                                        {...omit(searchInputProps, ['value', 'onChangeText'])}
                                        value={keyword}
                                        style={styles.searchInput}
                                        wrapStyle={styles.searchInputWrap}
                                        onChangeText={handleKeywordChange}
                                        showSoftInputOnFocus={searchInputProps?.showSoftInputOnFocus ?? showSoftInputOnFocus}
                                    />
                                </View>
                            )
                            : null
                    }
                    <ScrollView style={scrollViewStyle}>
                        { renderItems() }
                    </ScrollView>
                    <PickerFooter
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                        { ...footerProps }
                    />
                </View>
            </Mask>
        </RootSiblingPortal>
    )
}

PickerPanel.displayName = 'PickerPanel'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    header: {
        height: baseHeaderHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    searchInput: {
        height: 30,
        padding: 0
    },
    searchInputWrap: {
        height: 30
    }
})
