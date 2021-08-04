import React, { FC, useState, PropsWithChildren, cloneElement, ReactElement, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { ICascaderProps, CascaderValueType } from './interface';
import PropTypes from 'prop-types';
import { List } from '../list';
import { renderWithText, colors } from '../../utils';

const { width, height } = Dimensions.get('window');
const { ActivableItem } = List;

const Cascader: FC<PropsWithChildren<ICascaderProps>> = ({
    value: propsValue = [],
    options = [],
    style,
    notFoundContent,
    zIndex = 1,
    children,
    onCancel,
    onConfirm,
    onVisibleChange
}: PropsWithChildren<ICascaderProps>) => {
    const [value, setValue] = useState<CascaderValueType[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [panelIndex, setPanelIndex] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);
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
            onConfirm(value);
        }

        if (onVisibleChange) {
            onVisibleChange(false);
        }
    }
    const handleClickChildren = () => {
        setVisible(true);

        if (onVisibleChange) {
            onVisibleChange(true);
        }
    }
    const handleListChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }
    const propsValueDep = propsValue.join('-');

    useEffect(() => {
        setValue([...propsValueDep.split('-')]);
    }, [propsValueDep]);

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
                        <View style={[styles.header, style]}>
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
                            <List
                                activeIndex={activeIndex}
                                onChange={handleListChange}
                                style={styles.list}
                                itemStyle={styles.item}
                                activeItemStyle={styles.activeItem}
                            >
                                {
                                    options.map((option, panelIndex) => {
                                        return (
                                            <ActivableItem key={option.value}>
                                                {
                                                    option.label
                                                        ? renderWithText(option.label)
                                                        : <Text>{ option.value }</Text>
                                                }
                                            </ActivableItem>
                                        );
                                    })
                                }
                            </List>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
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

Cascader.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string.isRequired),
        PropTypes.arrayOf(PropTypes.number.isRequired)
    ]),
    style: PropTypes.object,
    notFoundContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    zIndex: PropTypes.number,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onVisibleChange: PropTypes.func
}

export default Cascader;
