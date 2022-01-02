import React, { FC } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { IEmptyProps } from './interface'

export const Empty: FC<IEmptyProps> = ({
    style,
    description = '暂无数据',
    image
}: IEmptyProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.wrapper}>
                {
                    image ? (
                        <Image source={image} style={{ marginBottom: 8 }} />
                    ) : null
                }
                <Text
                    style={styles.desc}
                >
                    { description }
                </Text>
            </View>
        </View>
    )
}

Empty.displayName = 'Empty'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
        color: '#00000040'
    }
})
