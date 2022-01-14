import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { ConfigContext } from '../config-provider';
const { width, height } = Dimensions.get('window');
export class Loading {
    static show() {
        if (Loading.sibling) {
            return;
        }
        Loading.sibling = new RootSiblings(React.createElement(ConfigContext.Consumer, null, ({ loadingZIndex }) => {
            return (React.createElement(View, { style: [styles.maskStyle, { zIndex: loadingZIndex }] },
                React.createElement(View, { style: styles.backViewStyle },
                    React.createElement(ActivityIndicator, { size: 'large', color: 'white' }))));
        }));
    }
    static hide() {
        if (!Loading.sibling) {
            return;
        }
        Loading.sibling.destroy();
        Loading.sibling = null;
    }
}
Loading.sibling = null;
const styles = StyleSheet.create({
    maskStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backViewStyle: {
        backgroundColor: '#111',
        width: 120,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
});
