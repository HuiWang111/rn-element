import React, { FC, useMemo } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, TextStyle } from 'react-native'
import PropTypes from 'prop-types'
import { IPageProps, IFn } from './interface'
import { KeyCode } from '../../constants'
import { useKeyUp, useTheme } from '../../hooks'
import { isFunction, isString, isUndefined, defaultPageFnKeyMap } from '../../utils'

export const Page: FC<IPageProps> = ({
    Component = View,
    componentProps,
    F1,
    F2,
    F3,
    F4,
    mockFn = true,
    keyborad = true,
    mockFnKeyMap = defaultPageFnKeyMap,
    header,
    headerStyle,
    style,
    fnStyle,
    children
}: IPageProps) => {
    const { width, height } = useWindowDimensions()
    const { page } = useTheme()
    
    const headerTextStyle: TextStyle = {
        color: page?.headerTextColor,
        fontSize: page?.headerTextSize
    }
    const bottomTextStyle: TextStyle = {
        color: page?.bottomTextColor,
        fontSize: page?.bottomTextSize
    }
    const quarter = width / 4

    const F1KeyCodes = useMemo<number[]>(() => {
        if (!mockFn || !keyborad) return [KeyCode.F1]
        return mockFnKeyMap.F1 ? [KeyCode.F1].concat(mockFnKeyMap.F1) : [KeyCode.F1]
    }, [mockFn, keyborad, mockFnKeyMap.F1])

    const F2KeyCodes = useMemo<number[]>(() => {
        if (!mockFn || !keyborad) return [KeyCode.F2]
        return mockFnKeyMap.F2 ? [KeyCode.F2].concat(mockFnKeyMap.F2) : [KeyCode.F1]
    }, [mockFn, keyborad, mockFnKeyMap.F2])

    const F3KeyCodes = useMemo<number[]>(() => {
        if (!mockFn || !keyborad) return [KeyCode.F3]
        return mockFnKeyMap.F3 ? [KeyCode.F3].concat(mockFnKeyMap.F3) : [KeyCode.F3]
    }, [mockFn, keyborad, mockFnKeyMap.F3])

    const F4KeyCodes = useMemo<number[]>(() => {
        if (!mockFn || !keyborad) return [KeyCode.F4]
        return mockFnKeyMap.F4 ? [KeyCode.F4].concat(mockFnKeyMap.F4) : [KeyCode.F4]
    }, [mockFn, keyborad, mockFnKeyMap])

    useKeyUp((event): void => {
        if (F1?.handler && F1KeyCodes.includes(event.which)) {
            F1.handler()
        } else if (F2?.handler && F2KeyCodes.includes(event.which)) {
            F2.handler()
        } else if (F3?.handler && F3KeyCodes.includes(event.which)) {
            F3.handler()
        } else if (F4?.handler && F4KeyCodes.includes(event.which)) {
            F4.handler()
        }
    }, [F1?.handler, F2?.handler, F3?.handler, F4?.handler])

    let restHeight = height
    if (header) {
        restHeight -= 50
    }
    const displayFnBar = Boolean(F1 || F2 || F3 || F4)
    if (displayFnBar) {
        restHeight -= 40
    }

    const handlePressFn = (fn: IFn) => {
        if (fn.disabled) {
            return
        }

        fn.handler?.()
    }

    return (
        <Component
            { ...componentProps }
            style={[{ width, height, display: 'flex' }, style]}
        >
            {
                header
                    ? (
                        <View
                            style={[
                                {
                                    width,
                                    backgroundColor: page?.headerBackgroundColor
                                },
                                styles.header,
                                headerStyle?.container
                            ]}
                        >
                            {
                                header.left ? (
                                    <View style={[styles.headerLeft, headerStyle?.left]}>
                                        {
                                            isString(header.left)
                                                ? <Text style={headerTextStyle}>{ header.left }</Text>
                                                : header.left
                                        }
                                    </View>
                                ) : null
                            }
                            {
                                header.center ? (
                                    <View style={[styles.headerCenter, headerStyle?.center]}>
                                        {
                                            isString(header.center)
                                                ? <Text style={headerTextStyle}>{ header.center }</Text>
                                                : header.center
                                        }
                                    </View>
                                ) : null
                            }
                            {
                                header.right ? (
                                    <View style={[styles.headerRight, headerStyle?.right]}>
                                        {
                                            isString(header.right)
                                                ? <Text style={headerTextStyle}>{ header.right }</Text>
                                                : header.right
                                        }
                                    </View>
                                ) : null
                            }
                        </View>
                    )
                    : null
            }
            {
                isFunction(children)
                    ? children({ width, height: restHeight - 25 })
                    : children
            }
            {
                displayFnBar
                    ? (
                        <View
                            style={[
                                {
                                    width,
                                    backgroundColor: page?.bottomBackgroundColor
                                },
                                styles.fnBar,
                                fnStyle?.bar
                            ]}
                        >
                            {
                                F1 && (isUndefined(F1.shouldDisplay) || F1.shouldDisplay === true)
                                    ? <TouchableOpacity style={[{ flexBasis: quarter }, styles.fnCol, fnStyle?.col]} onPress={() => handlePressFn(F1)}>
                                        {
                                            isString(F1.label)
                                                ? <Text style={bottomTextStyle}>{F1.label}</Text>
                                                : F1.label
                                        }
                                    </TouchableOpacity>
                                    : null
                            }
                            {
                                F2 && (isUndefined(F2.shouldDisplay) || F2.shouldDisplay === true)
                                    ? <TouchableOpacity style={[{ flexBasis: quarter }, styles.fnCol, fnStyle?.col]} onPress={() => handlePressFn(F2)}>
                                        {
                                            isString(F2.label)
                                                ? <Text style={bottomTextStyle}>{F2.label}</Text>
                                                : F2.label
                                        }
                                    </TouchableOpacity>
                                    : null
                            }
                            {
                                F3 && (isUndefined(F3.shouldDisplay) || F3.shouldDisplay === true)
                                    ? <TouchableOpacity style={[{ flexBasis: quarter }, styles.fnCol, fnStyle?.col]} onPress={() => handlePressFn(F3)}>
                                        {
                                            isString(F3.label)
                                                ? <Text style={bottomTextStyle}>{F3.label}</Text>
                                                : F3.label
                                        }
                                    </TouchableOpacity>
                                    : null
                            }
                            {
                                F4 && (isUndefined(F4.shouldDisplay) || F4.shouldDisplay === true)
                                    ? <TouchableOpacity style={[{ flexBasis: quarter }, styles.fnCol, fnStyle?.col]} onPress={() => handlePressFn(F4)}>
                                        {
                                            isString(F4.label)
                                                ? <Text style={bottomTextStyle}>{F4.label}</Text>
                                                : F4.label
                                        }
                                    </TouchableOpacity>
                                    : null
                            }
                        </View>
                    )
                    : null
            }
        </Component>
    )
}

Page.propTypes = {
    mockFn: PropTypes.bool,
    keyborad: PropTypes.bool
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        flexBasis: 50,
        flexGrow: 0,
        flexShrink: 0
    },
    headerLeft: {
        flexBasis: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    headerCenter: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    headerRight: {
        flexBasis: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    fnBar: {
        flexDirection: 'row',
        flexBasis: 40,
        flexGrow: 0,
        flexShrink: 0
    },
    fnCol: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
