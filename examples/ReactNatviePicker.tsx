import React, { FC, useState } from 'react';
import { Text, StyleSheet, Dimensions, View } from 'react-native';
import { List, Page } from '../src';
import { useHistory } from 'react-router-native';
import { colors } from '../src/utils';

const PickerDemo: FC = (): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0);
    const history = useHistory();
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    return (
        <Page
            header={{
                center: <Text>Picker</Text>
            }}
            F1={{
                label: <Text>F1 返回</Text>,
                handler: () => {
                    history.goBack();
                }
            }}
        >
            {
                ({ width, height }) => (
                    <View
                        style={{
                            width,
                            height: height - 30
                        }}
                    >
                        <List
                            activeIndex={activeIndex}
                            onChange={handleChange}
                            style={[styles.list, { width, height: height - 30 }]}
                            itemStyle={styles.item}
                            activeItemStyle={styles.activeItem}
                        >
                            <List.ActivableItem>
                                <Text>1</Text>
                            </List.ActivableItem>
                        </List>
                    </View>
                )
            }
        </Page>
    );
}

export default PickerDemo;

const styles = StyleSheet.create({
    list: {
        height: Dimensions.get('window').height - 70
    },
    item: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
    },
    pickerItem: {},
    activeItem: {
        backgroundColor: 'yellow'
    },
    lastItem: {
        borderBottomWidth: 0
    }
});