import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
export const Empty = ({ style, description = '暂无数据', image }) => {
    return (React.createElement(View, { style: [styles.container, style] },
        React.createElement(View, { style: styles.wrapper },
            image ? (React.createElement(Image, { source: image, style: { marginBottom: 8 } })) : null,
            React.createElement(Text, { style: styles.desc }, description))));
};
Empty.displayName = 'Empty';
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
        color: '#00000040'
    }
});
