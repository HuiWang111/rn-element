import React from 'react';
import { StyleSheet, View } from 'react-native';
export const Mask = ({ zIndex = 10, backgroundColor = 'rgba(0, 0, 0, 0.3)', style, children }) => {
    const maskContainerStyles = [
        styles.container,
        { zIndex, backgroundColor }
    ];
    if (style) {
        maskContainerStyles.push(style);
    }
    return (React.createElement(View, { style: maskContainerStyles }, children));
};
const styles = StyleSheet.create({
    container: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { justifyContent: 'center', alignItems: 'center' })
});
