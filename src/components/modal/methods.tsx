import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { Modal } from './Modal';
import { IModalConfig, IModalType } from './interface';
import { omit, colors } from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';

let sibling: null | RootSiblings = null;
const typeMapIcon = {
    confirm: 'questioncircleo',
    info: 'infocirlceo',
    error: 'closecircle',
    warning: 'exclamationcircleo',
    success: 'checkcircleo'
};
const typeMapIconColor = {
    confirm: colors.warning,
    info: colors.primary,
    error: colors.error,
    warning: colors.warning,
    success: colors.success
};

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
});

const method = (type: IModalType, config: IModalConfig): void => {
    if (sibling || !config) return;

    if (config.onVisibleChange) {
        config.onVisibleChange(true);
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
                    sibling.destroy();
                }

                if (config.onCancel) {
                    config.onCancel();
                }

                if (config.onVisibleChange) {
                    config.onVisibleChange(false);
                }
                sibling = null;
            }}
            onOk={() => {
                if (sibling) {
                    sibling.destroy();
                }

                if (config.onOk) {
                    config.onOk();
                }

                if (config.onVisibleChange) {
                    config.onVisibleChange(false);
                }
                sibling = null;
            }}
            onRequestClose={() => {
                if (sibling) {
                    sibling.destroy();
                    sibling = null;
                }

                if (config.onVisibleChange) {
                    config.onVisibleChange(false);
                }
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
                    { config.title }
                </View>
                { config.content }
            </>
        </Modal>
    )
}

export const confirm = (config: IModalConfig) => {
    return method('confirm', config);
}

const customizedFooter = ({ onOk, okText }) => (
    <View style={styles.button}>
        <Button
            title={okText || '知道了'}
            onPress={() => { onOk && onOk() }}
        />
    </View>
)

export const info = (config: IModalConfig) => {
    return method('info', {
        ...config,
        footer: customizedFooter
    });
}

export const error = (config: IModalConfig) => {
    return method('error', {
        ...config,
        footer: customizedFooter
    });
}

export const success = (config: IModalConfig) => {
    return method('success', {
        ...config,
        footer: customizedFooter
    });
}

export const warning = (config: IModalConfig) => {
    return method('warning', {
        ...config,
        footer: customizedFooter
    });
}
