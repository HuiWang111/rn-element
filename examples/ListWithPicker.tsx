import React, { FC, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { List, Enterable, Page } from '../src';
import { colors } from '../src/utils';

const ListWithCascader: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [control, setControl] = useState(true);
    const history = useHistory();
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    return (
        <Page
            header={{
                center: 'Page',
                left: 'Left',
                right: 'RightRightRightRight'
            }}
            F1={{
                label: '返回',
                handler: () => {
                    history.goBack();
                }
            }}
        >
            {
                ({ width, height }) => (
                    <List
                        activeIndex={activeIndex}
                        onChange={handleChange}
                        style={{
                            ...styles.list,
                            width,
                            height: height - 30,
                            flexGrow: 0,
                            backgroundColor: '#fff'
                        }}
                        itemStyle={styles.item}
                        activeItemStyle={styles.activeItem}
                        keyboard={control}
                    >
                        <List.ActivableItem>
                            <List.Picker
                                title='Picker'
                                value='2'
                                overlay={
                                    <List
                                        style={{ height: 200 }}
                                        itemStyle={styles.item}
                                        activeItemStyle={styles.activeItem}
                                        keyboard={true}
                                    >
                                        {
                                            ['1', '2', '3', '4', '5'].map(n => {
                                                return <List.ActivableItem key={n} value={n}>{ n }</List.ActivableItem>
                                            })
                                        }
                                    </List>
                                }
                                onVisibleChange={(visible) => {
                                    setControl(!visible)
                                }}
                            >
                                <Enterable isEnterable={activeIndex === 0}>
                                    <Text>show picker</Text>
                                </Enterable>
                            </List.Picker>
                        </List.ActivableItem>
                        <List.ActivableItem>
                            <Text>1 - activable</Text>
                        </List.ActivableItem>
                        <List.Item>
                            <Text>2</Text>
                        </List.Item>
                        <List.Item>
                            <Text>3</Text>
                        </List.Item>
                    </List>
                )
            }
        </Page>
    );
}

export default ListWithCascader;

const styles = StyleSheet.create({
    list: {},
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
