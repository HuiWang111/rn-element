import React, { FC, useMemo } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import { IPageProps } from './interface';
import { KeyCode } from '../../constants';
import { useKeyEvents } from '../../hooks';
import { isFunction } from '../../utils';

export const Page: FC<IPageProps> = ({
    F1,
    F2,
    F3,
    F4,
    mockFn = true,
    keyborad = true,
    mockFnKeyMap = {
        F1: KeyCode.Z,
        F2: KeyCode.X,
        F3: KeyCode.C,
        F4: KeyCode.V
    },
    header,
    headerStyle,
    style,
    FnStyle,
    children
}: IPageProps) => {
    const { width, height } = useWindowDimensions();

    const F1KeyCodes = useMemo<number[]>(() => {
        if (!mockFn || !keyborad) return [KeyCode.F1];
        return mockFnKeyMap.F1 ? [KeyCode.F1].concat(mockFnKeyMap.F1) : [KeyCode.F1];
    }, [mockFn, keyborad, mockFnKeyMap.F1]);

    const F2KeyCodes = useMemo<number[]>(() => {
        if (!mockFn || !keyborad) return [KeyCode.F2];
        return mockFnKeyMap.F2 ? [KeyCode.F2].concat(mockFnKeyMap.F2) : [KeyCode.F1];
    }, [mockFn, keyborad, mockFnKeyMap.F2]);

    const F3KeyCodes = useMemo<number[]>(() => {
        if (!mockFn || !keyborad) return [KeyCode.F3];
        return mockFnKeyMap.F3 ? [KeyCode.F3].concat(mockFnKeyMap.F3) : [KeyCode.F3];
    }, [mockFn, keyborad, mockFnKeyMap.F3]);

    const F4KeyCodes = useMemo<number[]>(() => {
        if (!mockFn || !keyborad) return [KeyCode.F4];
        return mockFnKeyMap.F4 ? [KeyCode.F4].concat(mockFnKeyMap.F4) : [KeyCode.F4];
    }, [mockFn, keyborad, mockFnKeyMap]);

    useKeyEvents('keyup', (event): void => {
        if (F1?.handler && F1KeyCodes.includes(event.which)) {
            F1.handler();
        } else if (F2?.handler && F2KeyCodes.includes(event.which)) {
            F2.handler();
        } else if (F3?.handler && F3KeyCodes.includes(event.which)) {
            F3.handler();
        } else if (F4?.handler && F4KeyCodes.includes(event.which)) {
            F4.handler();
        }
    }, [F1, F2, F3, F4]);

    let restHeight = height;
    if (header) {
        restHeight -= 50;
    }
    const displayFnBar = Boolean(F1 || F2 || F3 || F4);
    if (displayFnBar) {
        restHeight -= 50;
    }

    return (
        <View style={[{ width, height, display: 'flex' }, style]}>
            {
                header
                    ? <View style={[{ width },styles.header, headerStyle?.container]}>
                        <View style={[styles.headerLeft, headerStyle?.left]}>
                            { header.left }
                        </View>
                        <View style={[styles.headerCenter, headerStyle?.center]}>
                            { header.center }
                        </View>
                        <View style={[styles.headerRight, headerStyle?.right]}>
                            { header.right }
                        </View>
                    </View>
                    : null
            }
            {
                isFunction(children)
                    ? children({ width, height: restHeight })
                    : children
            }
            {
                displayFnBar
                    ? <View style={[{ width }, styles.fnBar, FnStyle?.bar]}>
                        {
                            F1
                                ? <Pressable style={[{ width: width/4 }, styles.fnCol, FnStyle?.col]} onPress={F1.handler}>{F1.label}</Pressable>
                                : null
                        }
                        {
                            F2
                                ? <Pressable style={[{ width: width/4 }, styles.fnCol, FnStyle?.col]} onPress={F2.handler}>{F2.label}</Pressable>
                                : null
                        }
                        {
                            F3
                                ? <Pressable style={[{ width: width/4 }, styles.fnCol, FnStyle?.col]} onPress={F3.handler}>{F3.label}</Pressable>
                                : null
                        }
                        {
                            F4
                                ? <Pressable style={[{ width: width/4 }, styles.fnCol, FnStyle?.col]} onPress={F4.handler}>{F4.label}</Pressable>
                                : null
                        }
                    </View>
                    : null
            }
        </View>
    );
};

Page.displayName = 'Page';
Page.propTypes = {
    mockFn: PropTypes.bool,
    keyborad: PropTypes.bool
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        flexBasis: 50,
    },
    headerLeft: {
        flexBasis: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        
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
        flexBasis: 50
    },
    fnCol: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
