import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Switch, Page } from '../src';

export const SwitchDemo: FC = () => {
    const [checked, setChecked] = useState(false);
    const history = useHistory();

    const handleChange = (checked: boolean) => {
        setChecked(checked);
    }

    return (
        <Page
            header={{
                center: <Text>Page</Text>,
                left: <Text>Left</Text>,
                right: <Text numberOfLines={1}>RightRightRightRight</Text>
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
                    <View style={{ width, height: height - 30, paddingHorizontal: 10 }}>
                        <Switch checked={checked} onChange={handleChange} />
                        <Switch disabled style={{ marginTop: 10 }} />
                        <Switch style={{ marginTop: 10 }} />
                    </View>
                )
            }
        </Page>
    );
}
