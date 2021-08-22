import React, { FC, PropsWithChildren, cloneElement, ReactElement, useState, Children, ReactText, useEffect } from 'react';
import { Modal, View, Button, StyleSheet, Dimensions } from 'react-native';
import { IPickerProps, PressEvent } from './interface';
import { isFunction } from '../../utils';
import { useArrowDown, useArrowUp } from '../../hooks';

const { width, height } = Dimensions.get('window');

export const Picker: FC<PropsWithChildren<IPickerProps>> = ({
    value: propsValue,
    overlay,
    children,
    zIndex,
    title,
    itemStyle,
    activeItemStyle,
    onConfirm,
    onCancel,
    onVisibleChange
}: PropsWithChildren<IPickerProps>) => {
    const overlayContent: ReactElement = isFunction(overlay) ? overlay() : overlay;
    const values: ReactText[] = Children.map(overlayContent, o => (o as ReactElement).props.value);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState<ReactText>(values[0]);

    const handlePressChildren = (
        e?: PressEvent,
        onPress?: (e: PressEvent) => void,
        onEnter?: () => void
    ) => {
        setVisible(true);

        e && onPress?.(e);
        onEnter?.();
        onVisibleChange?.(false);
    }

    const handleCancel = () => {
        setVisible(false);

        onCancel?.();
        onVisibleChange?.(false);
    }

    const handleConfirm = () => {
        setVisible(false);
        
        onConfirm?.(value);
        onVisibleChange?.(false);
    }

    useEffect(() => {
        setValue(propsValue);
    }, [propsValue]);

    useArrowUp(() => {
        const currentIndex = values.indexOf(value);
        if (currentIndex < 1) return;
        setValue(values[currentIndex - 1]);
    }, [value, values]);

    useArrowDown(() => {
        const currentIndex = values.indexOf(value);
        if (currentIndex === -1 || currentIndex === (values.length - 1)) return;
        setValue(values[currentIndex + 1]); 
    }, [value, values]);

    return (
        <>
            {
                cloneElement(children as ReactElement, {
                    onPress: (e) => handlePressChildren(e, (children as ReactElement).props.onPress),
                    onEnter: () => handlePressChildren(undefined, undefined, (children as ReactElement).props.onEnter)
                })
            }
            <Modal
                animationType='slide'
                transparent={true}
                style={{
                    zIndex
                }}
                visible={visible}          
            >
                <View style={styles.bottomView}>
                    <View style={styles.container}>
                        <View style={[styles.header]}>
                            <View style={styles.headerBtn}>
                                <Button title='取消' onPress={handleCancel}></Button>
                            </View>
                            <View style={styles.headerTitle}>
                                { title }
                            </View>
                            <View style={styles.headerBtn}>
                                <Button title='确定' onPress={handleConfirm}></Button>
                            </View>
                        </View>
                        <View style={styles.body}>
                            {
                                Children.map(overlayContent, PickerItem => {
                                    return cloneElement(PickerItem as ReactElement, {
                                        isActive: value === (PickerItem as ReactElement).props.value,
                                        itemStyle,
                                        activeItemStyle
                                    });
                                })
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

Picker.displayName = 'Picker';

const styles = StyleSheet.create({
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22
    },
    container: {
        width,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 6
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: height - 200
    },
    header: {
        width: '100%',
        flexDirection: 'row'
    },
    headerBtn: {
        flexBasis: 50
    },
    headerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        paddingVertical: 20
    }
});
