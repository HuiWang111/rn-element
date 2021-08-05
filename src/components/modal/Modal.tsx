import React, { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Modal as ReactNativeModal, View, StyleSheet, Button, useWindowDimensions } from 'react-native';
import { IModalProps } from './interface';
import { colors, isUndefined, renderWithText } from '../../utils';

export const Modal: FC<PropsWithChildren<IModalProps>> = ({
    title,
    footer,
    zIndex,
    okText = '确定',
    cancelText = '取消',
    titleStyle,
    bodyStyle,
    footerStyle,
    onOk,
    onCancel,
    children,
    visible = false,
    onVisibleChange,
    ...restProps
}: PropsWithChildren<IModalProps>) => {
    const { width } = useWindowDimensions();
    const commonStyle = {
        width: width - 80
    };
    const getFooter = (footer?: string | JSX.Element): ReactNode | null | undefined => {
        if (isUndefined(footer)) {
            return (
                <>
                    <View style={styles.okBtnWrap}>
                        <Button
                            title={okText}
                            onPress={() => { onOk && onOk() }}
                        />
                    </View>
                    <View style={styles.cancalBtnWrap}>
                        <Button
                            title={cancelText}
                            onPress={() => { onCancel && onCancel() }}
                            color='#d7d7d7'
                        />
                    </View>
                </>
            );
        }

        return renderWithText(footer);
    }

    useEffect(() => {
        onVisibleChange && onVisibleChange(visible);
    }, [visible, onVisibleChange]);

    return (
        <ReactNativeModal
            animationType='slide'
            transparent={true}
            style={{
                zIndex
            }}
            visible={visible}
            {...restProps}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {
                        title
                            ? (
                                <View style={[styles.title, commonStyle, titleStyle]}>
                                    { renderWithText(title) }
                                </View>
                            )
                            : null
                    }
                    {
                        children
                            ? (
                                <View style={[styles.body, commonStyle, bodyStyle]}>
                                    { renderWithText(children) }
                                </View>
                            )
                            : null
                    }
                    <View style={[styles.footer, commonStyle, footerStyle]}>
                        { getFooter(footer) }
                    </View>
                </View>
            </View>
        </ReactNativeModal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    body: {
        paddingVertical: 20
    },
    footer: {
        paddingVertical: 10,
        flexDirection: 'row'
    },
    okBtnWrap: {
        flex: 1
    },
    cancalBtnWrap: {
        flex: 1,
        marginLeft: 10
    }
});