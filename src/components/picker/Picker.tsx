import React, {
    Children,
    cloneElement,
    FC,
    PropsWithChildren,
    ReactElement,
    ReactText,
    useEffect,
    useState,
    useContext
} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    StyleProp,
    ViewStyle
} from 'react-native';
import { Mask } from '../base/Mask';
import { IPickerProps } from './interface';
import { PickerFooter } from '../base/PickerFooter';
import { PickerContext } from './context';
import { useArrowUp, useArrowDown } from '../../hooks';
import { omit } from '../../utils';
import { ConfigContext } from '../config-provider';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const containerWidth = screenWidth - 40;
const containerHeight = screenHeight - 90;

export const Picker: FC<PropsWithChildren<IPickerProps>> = ({
    zIndex,
    maskStyle,
    children,
    value: propsValue,
    activeItemStyle,
    itemStyle,
    visible = false,
    showSearch = false,
    searchInputProps,
    onSearch,
    onCancel,
    onConfirm
}: PropsWithChildren<IPickerProps>) => {
    const values: ReactText[] = Children.map(children, (item: ReactElement) => {
        return item.props?.value;
    }) || [];
    const [value, setValue] = useState<ReactText>(values[0] || '');
    const [keyword, setKeyword] = useState<string>('');
    const { showSoftInputOnFocus } = useContext(ConfigContext);
    const scrollViewStyle: StyleProp<ViewStyle> = {
        height: containerHeight - 50
    };

    if (showSearch) {
        (scrollViewStyle.height as number) -= 50;
    }

    useEffect(() => {
        setValue(propsValue || '');
    }, [propsValue]);

    useArrowUp(() => {
        const index = values.findIndex(v => v === value);
        
        if (index > 0) {
            setValue(values[index - 1]);
        }
    }, [value]);

    useArrowDown(() => {
        const index = values.findIndex(v => v === value);
        const maxIndex = values.length - 1;
        
        if (index < maxIndex) {
            setValue(values[index + 1]);
        }
    }, [value]);

    const resetState = () => {
        setValue(values[0] || '');
        setKeyword('');
    }

    const handleConfirm = (): void => {
        onConfirm?.(value);
        resetState();
    };

    const handleCancel = (): void => {
        onCancel?.();
        resetState();
    }

    const handleKeywordChange = (value: string) => {
        setKeyword(value);
        onSearch?.(value);
    }
    
    return (
        <Mask
            zIndex={zIndex}
            style={maskStyle}
            visible={visible}
        >
            <View style={styles.container}>
                {
                    showSearch
                        ? <View style={styles.searchContainer}>
                            <TextInput
                                {...omit(searchInputProps, ['value', 'onChangeText'])}
                                value={keyword}
                                onChangeText={handleKeywordChange}
                                showSoftInputOnFocus={showSoftInputOnFocus}
                            />
                        </View>
                        : null
                }
                <ScrollView style={scrollViewStyle}>
                    <PickerContext.Provider value={{ setValue, activeItemStyle, itemStyle }}>
                        {
                            Children.map(children, (item: ReactElement) => {
                                return cloneElement(item, {
                                    isActive: value === item.props?.value
                                })
                            })
                        }
                    </PickerContext.Provider>
                </ScrollView>
                <PickerFooter
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            </View>
        </Mask>
    );
}

const styles = StyleSheet.create({
    container: {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: '#fff'
    },
    searchContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
