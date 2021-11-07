import React, { FC, PropsWithChildren, ReactNode, useContext, useEffect } from 'react';
import { Modal as ReactNativeModal, View, StyleSheet, useWindowDimensions, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { IModalProps, IModalFooter } from './interface';
import { isUndefined, isString, isFunction } from '../../utils';
import { ThemeContext } from '../theme-provider';
import { Button } from '../button';

const screenWith = Dimensions.get('window').width;

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
    const colors = useContext(ThemeContext);
    const commonStyle = {
        width: width - 80
    };
    const getFooter = (footer?: IModalFooter): ReactNode | null | undefined => {
        if (isUndefined(footer)) {
            return (
                <>
                    <View style={styles.okBtnWrap}>
                        <Button
                            type='primary'
                            title={okText}
                            onPress={() => { onOk && onOk() }}
                        />
                    </View>
                    <View style={styles.cancalBtnWrap}>
                        <Button
                            title={cancelText}
                            onPress={() => { onCancel && onCancel() }}
                        />
                    </View>
                </>
            );
        }

        if (isFunction(footer)) {
            return footer({
                okText,
                cancelText,
                onOk,
                onCancel
            });
        }

        return footer;
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
                                <View
                                    style={[
                                        styles.title,
                                        { borderBottomColor: colors.border },
                                        commonStyle,
                                        titleStyle
                                    ]}
                                >
                                    {
                                        isString(title)
                                            ? <Text>{title}</Text>
                                            : title
                                    }
                                </View>
                            )
                            : null
                    }
                    {
                        children
                            ? (
                                <View style={[styles.body, commonStyle, bodyStyle]}>
                                    { children }
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
        width: screenWith - 40,
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
        borderBottomWidth: 1
    },
    body: {
        paddingVertical: 20
    },
    footer: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    okBtnWrap: {
        flex: 1
    },
    cancalBtnWrap: {
        flex: 1,
        marginLeft: 10
    }
});

Modal.displayName = 'Modal';

Modal.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    zIndex: PropTypes.number,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    onVisibleChange: PropTypes.func
}