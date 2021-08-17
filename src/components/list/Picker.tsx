import React, { FC, PropsWithChildren, cloneElement, useState, ReactElement, Children, ReactText, useEffect, useMemo } from 'react';
import { View, Modal, Dimensions, Button, StyleSheet } from 'react-native';
import { IPickerProps, PressEvent } from './interface';
import { isFunction } from '../../utils';

const { width, height } = Dimensions.get('window');

const Picker: FC<PropsWithChildren<IPickerProps>> = ({
    value,
    overlay,
    children,
    zIndex,
    title,
    onConfirm,
    onCancel,
    onVisibleChange
}: PropsWithChildren<IPickerProps>) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState<ReactText>(value);

    const overlayContent: ReactElement = isFunction(overlay) ? overlay() : overlay;
    const foundIndex = Children.toArray(overlayContent.props.children).findIndex(c => (c as ReactElement).props.value === selectedKey);
    const activeIndex = useMemo(() => {
        return foundIndex > -1 ? foundIndex : 0
    }, [foundIndex]);
    
    useEffect(() => {
        setSelectedKey(value);
    }, [value]);

    const handleListChange = (idx: number) => {
        const listItems = Children.toArray(overlayContent.props.children);
        if (listItems[idx]) {
            setSelectedKey((listItems[idx] as ReactElement).props.value);
        }
    }
    const handleTapChildren = (
        e?: PressEvent,
        onPress?: (e: PressEvent) => void,
        onEnter?: () => void
    ) => {
        setVisible(true);

        if (onVisibleChange) {
            onVisibleChange(true);
        }
        if (onPress && e) {
            onPress(e);
        }
        if (onEnter) {
            onEnter();
        }
    }
    const handleCancel = () => {
        setVisible(false);

        if (onCancel) {
            onCancel();
        }

        if (onVisibleChange) {
            onVisibleChange(false);
        }
    }
    const handleConfirm = () => {
        setVisible(false);

        if (onConfirm) {
            onConfirm(selectedKey);
        }

        if (onVisibleChange) {
            onVisibleChange(false);
        }
    }

    return (
        <>
            {
                cloneElement(children as ReactElement, {
                    onEnter: () => handleTapChildren(undefined, undefined, (children as ReactElement).props.onEnter)
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
                                cloneElement(overlayContent, {
                                    activeIndex,
                                    onChange: (activeIndex: number) => {
                                        if (overlayContent.props.onChange) {
                                            overlayContent.props.onChange(activeIndex);
                                        }
                                        handleListChange(activeIndex);
                                    }
                                })
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );

}

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

Picker.displayName = 'ActivableListPicker';

export default Picker;
