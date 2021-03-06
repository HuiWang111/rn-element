import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import { Modal } from './Modal'
import { IModalConfig, IModalType } from './interface'
import { omit, colors, isString } from '../../utils'
import Icon from 'react-native-vector-icons/AntDesign'
import { Button } from '../button'

let sibling: null | RootSiblings = null
const typeMapIcon = {
    confirm: 'questioncircleo',
    info: 'infocirlceo',
    error: 'closecircle',
    warning: 'exclamationcircleo',
    success: 'checkcircleo'
}
const typeMapIconColor = {
    confirm: colors.warning,
    info: colors.primary,
    error: colors.error,
    warning: colors.warning,
    success: colors.success
}

const styles = StyleSheet.create({
    titleContainer: {
        position: 'relative',
        marginBottom: 20
    },
    titleIcon: {
        position: 'absolute',
        left: -30,
        top: 0
    },
    button: {
        flex: 1
    }
})

const method = (type: IModalType, config: IModalConfig): void => {
    if (sibling || !config) return

    if (config.onVisibleChange) {
        config.onVisibleChange(true)
    }

    sibling = new RootSiblings(
        <Modal
            { ...omit(config, ['content', 'onCancel', 'onOk', 'onVisibleChange', 'title']) }
            title={null}
            bodyStyle={{
                paddingLeft: 30
            }}
            onCancel={() => {
                if (sibling) {
                    sibling.destroy()
                }

                if (config.onCancel) {
                    config.onCancel()
                }

                if (config.onVisibleChange) {
                    config.onVisibleChange(false)
                }
                sibling = null
            }}
            onOk={() => {
                if (sibling) {
                    sibling.destroy()
                }

                if (config.onOk) {
                    config.onOk()
                }

                if (config.onVisibleChange) {
                    config.onVisibleChange(false)
                }
                sibling = null
            }}
            visible={true}
        >
            <>
                <View style={styles.titleContainer}>
                    <Icon
                        name={typeMapIcon[type]}
                        size={20}
                        style={[styles.titleIcon, { color: typeMapIconColor[type] }]}
                    />
                    {
                        isString(config.title)
                            ? <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{config.title}</Text>
                            : config.title
                    }
                </View>
                {
                    isString(config.content)
                        ? <Text>{config.content}</Text>
                        : config.content
                }
            </>
        </Modal>
    )
}

export const confirm = (config: IModalConfig) => {
    return method('confirm', config)
}

const customizedFooter = ({ onOk, okText }) => (
    <View style={styles.button}>
        <Button
            type='primary'
            title={okText || '?????????'}
            onPress={onOk}
        />
    </View>
)

export const info = (config: IModalConfig) => {
    return method('info', {
        ...config,
        footer: customizedFooter
    })
}

export const error = (config: IModalConfig) => {
    return method('error', {
        ...config,
        footer: customizedFooter
    })
}

export const success = (config: IModalConfig) => {
    return method('success', {
        ...config,
        footer: customizedFooter
    })
}

export const warning = (config: IModalConfig) => {
    return method('warning', {
        ...config,
        footer: customizedFooter
    })
}
