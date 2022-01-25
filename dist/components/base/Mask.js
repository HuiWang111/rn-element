import React from 'react';
import { StyleSheet, View } from 'react-native';
export const Mask = ({ zIndex = 10, backgroundColor = 'rgba(0, 0, 0, 0.3)', style, visible = false, children }) => {
    if (!visible)
        return null;
    let maskContainerStyles = [
        styles.container,
        { zIndex, backgroundColor }
    ];
    if (style) {
        maskContainerStyles = maskContainerStyles.concat(style);
    }
    return (React.createElement(View, { style: maskContainerStyles }, children));
};
Mask.displayName = 'Mask';
const styles = StyleSheet.create({
    container: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { justifyContent: 'center', alignItems: 'center' })
});
