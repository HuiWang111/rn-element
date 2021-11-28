import React, { FC, useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions, ViewStyle } from 'react-native';
import { ICheckListProps } from './interface';
import { isObject } from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../theme-provider';

const { width } = Dimensions.get('window');

export const CheckList: FC<ICheckListProps> = ({
    value: propsValue,
    options,
    activeColor: selectedColor,
    style,
    itemStyle,
    onChange
}: ICheckListProps) => {
    const [value, setValue] = useState<string[]>(propsValue || []);
    const theme = useContext(ThemeContext);
    const activeColor = selectedColor || theme.primary;

    useEffect(() => {
        setValue(propsValue || []);
    }, [propsValue]);

    const handleChange = (pressedValue: string, disabled = false): void => {
        if (disabled) {
            return
        }

        if (value.includes(pressedValue)) {
            onChange?.(value.filter(v => v !== pressedValue));
        } else {
            onChange?.([...value, pressedValue]);
        }
    }
    const getItemStyles = (isActive: boolean, index: number): (ViewStyle | null | undefined)[] => {
        return [
            styles.item,
            { borderTopColor: theme.border },
            isActive && activeColor ? { backgroundColor: activeColor } : null,
            index === 0 ? { borderTopWidth: 0 } : null,
            itemStyle
        ];
    }

    return (
        <View style={style}>
            {
                options?.map((option, index) => {
                    if (isObject(option)) {
                        const isActive = value.includes(option.value);

                        return (
                            <Pressable
                                key={option.value}
                                onPress={() => handleChange(option.value, option.disabled)}
                                style={getItemStyles(isActive, index)}
                            >
                                <Icon
                                    name='check'
                                    color='#fff'
                                    size={20}
                                    style={styles.checkIcon}
                                />
                                <Text
                                    style={[
                                        styles.itemText,
                                        isActive ? styles.activeItemText : null,
                                        option.disabled ? { color: theme.border } : null
                                    ]}
                                    numberOfLines={3}
                                >
                                    { option.label }
                                </Text>
                            </Pressable>
                        );
                    }

                    const isActive = value.includes(option);

                    return (
                        <Pressable
                            key={option}
                            onPress={() => handleChange(option)}
                            style={getItemStyles(isActive, index)}
                        >
                            <Icon
                                name='check'
                                color='#fff'
                                size={20}
                                style={styles.checkIcon}
                            />
                            <Text style={isActive ? styles.activeItemText : null}>{ option }</Text>
                        </Pressable>
                    );
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        width,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        position: 'relative',
        alignItems: 'center'
    },
    itemText: {
        width: width - 40
    },
    activeItemText: {
        color: '#fff'
    },
    checkIcon: {
        marginRight: 10
    }
});
