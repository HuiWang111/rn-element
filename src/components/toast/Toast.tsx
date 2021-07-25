import React from 'react';
import RootToast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet } from 'react-native';

interface IShowToastOptions extends Record<string, unknown> {
    duration?: number;
    position?: number;
    shadow?: boolean;
    animation?: boolean;
    hideOnPress?: boolean;
    delay?: number;
    onShow?: () => void;
    onShown?: () => void;
    onHide?: () => void;
    onHidden?: () => void;
}

const styles = StyleSheet.create({
    toastWrapper: {
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toastTitle: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 10
    }
});

export class Toast {
    private static setDefaultOptions(options?: IShowToastOptions): IShowToastOptions {
        options = options ? { ...options } : {};
        if (options.position == null) {
            options.position = RootToast.positions.CENTER;
        }

        return options;
    }

    private static handleMessage(message: string) {
        if (message.length < 27) {
            return message;
        }

        console.warn('[Toast] title提示过长，最多显示26个字符');
        return message.slice(0, 27);
    }

    static show(message: string, options?: IShowToastOptions): void {
        RootToast.show(message, this.setDefaultOptions(options));
    }

    static success(message: string, options?: IShowToastOptions): void {
        RootToast.show(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <View style={styles.toastWrapper}>
                <Icon name='check' size={50} color='#fff' />
                <Text style={styles.toastTitle}>{ this.handleMessage(message) }</Text>
            </View>,
            this.setDefaultOptions(options)
        );
    }
    
    static error(message: string, options?: IShowToastOptions): void {
        RootToast.show(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <View style={styles.toastWrapper}>
                <Icon name='close' size={50} color='#fff' />
                <Text style={styles.toastTitle}>{ this.handleMessage(message) }</Text>
            </View>,
            this.setDefaultOptions(options)
        );
    }

    static warning(message: string, options?: IShowToastOptions): void {
        RootToast.show(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <View style={styles.toastWrapper}>
                <Icon name='warning' size={50} color='#fff' />
                <Text style={styles.toastTitle}>{ this.handleMessage(message) }</Text>
            </View>,
            this.setDefaultOptions(options)
        );
    }
}