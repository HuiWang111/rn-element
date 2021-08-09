import React, { FC, PropsWithChildren, cloneElement, useState, ReactElement, Children, ReactText, useEffect } from 'react';
import { View, Modal, Dimensions, Button, Text, StyleSheet } from 'react-native';
import { IPickerProps } from './interface';
import { renderWithText, colors, isFunction } from '../../utils';

const { width, height } = Dimensions.get('window');

const Picker: FC<PropsWithChildren<IPickerProps>> = ({
    selectedKey: propSelectedkey,
    overlay,
    children,
    zIndex,
    onConfirm,
    onCancel,
    onVisibleChange
}: PropsWithChildren<IPickerProps>) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState<ReactText>(propSelectedkey);
    const handleClickChildren = () => {
        setVisible(true);

        if (onVisibleChange) {
            onVisibleChange(true);
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

    const overlayContent: ReactElement = isFunction(overlay) ? overlay() : overlay;
    const foundIndex = Children.toArray(overlayContent.props.children).findIndex(c => (c as ReactElement).props.key === selectedKey);
    const [activeIndex, setActiveIndex] = useState(
        foundIndex > -1 ? foundIndex : 0
    );

    const handleListChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    useEffect(() => {
        setSelectedKey(propSelectedkey)
    }, [propSelectedkey]);

    return (
        <>
            {
                cloneElement(children as ReactElement, {
                    onPress: handleClickChildren
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
                                <Button title='取消' onPress={handleCancel} />
                            </View>
                            <View style={styles.headerTitle}>
                                <Text>标题</Text>
                            </View>
                            <View style={styles.headerBtn}>
                                <Button title='确定' onPress={handleConfirm} />
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
            width: 0,
            height: 2
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
    },
    list: {
        width,
        height: height - 200 - 110
    },
    item: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderBottomColor: colors.border,
        borderBottomWidth: 1
    },
    activeItem: {
        backgroundColor: 'yellow'
    },
    lastItem: {
        borderBottomWidth: 0
    }
});

export default Picker;
