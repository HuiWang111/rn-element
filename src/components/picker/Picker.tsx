import React, {
    Children,
    cloneElement,
    FC,
    PropsWithChildren,
    ReactElement,
    ReactText,
    useEffect,
    useState,
    useContext,
    useMemo
} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    StyleProp,
    ViewStyle
} from 'react-native';
import { IPickerProps } from './interface';
import { PickerFooter, Mask, Empty } from '../base';
import { PickerContext } from './context';
import { useArrowUp, useArrowDown } from '../../hooks';
import { omit } from '../../utils';
import { ConfigContext } from '../config-provider';
import { Input } from '../input';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Picker: FC<PropsWithChildren<IPickerProps>> = ({
    zIndex = 10,
    maskStyle,
    children,
    value: propsValue,
    activeItemStyle,
    itemStyle,
    visible = false,
    showSearch = false,
    searchInputProps,
    fullScreen = true,
    footerProps = {},
    onSearch,
    onCancel,
    onConfirm
}: PropsWithChildren<IPickerProps>) => {
    const values = useMemo<ReactText[]>(() => {
        return Children.map(children, (item: ReactElement) => {
            return item.props?.value;
        }) || []
    }, [children]);
    const [value, setValue] = useState<ReactText>(propsValue ?? (values[0] ?? ''));
    const [keyword, setKeyword] = useState<string>('');
    const { showSoftInputOnFocus } = useContext(ConfigContext);
    const containerWidth = useMemo(() => {
        return fullScreen ? screenWidth : screenWidth - 40
    }, [fullScreen])
    const containerHeight = useMemo(() => {
        return fullScreen ? screenHeight - 20 : screenHeight - 90
    }, [fullScreen])
    const scrollViewStyle: StyleProp<ViewStyle> & { height: number, } = {
        height: containerHeight - 50
    };

    if (showSearch) {
        scrollViewStyle.height -= 50;
    }

    useEffect(() => {
        setValue(propsValue ?? (values[0] ?? ''));
    }, [propsValue, values]);
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
        onSearch?.('')
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
    
    const renderItems = () => {
        if (Children.count(children) === 0) {
            return <Empty style={{ height: scrollViewStyle.height }} />
        }

        return (
            <PickerContext.Provider value={{ setValue, activeItemStyle, itemStyle }}>
                {
                    Children.map(children, (item: ReactElement) => {
                        return cloneElement(item, {
                            isActive: value === item.props?.value
                        })
                    })
                }
            </PickerContext.Provider>
        )
    }

    return (
        <Mask
            zIndex={zIndex}
            style={maskStyle}
            visible={visible}
        >
            <View
                style={[
                    styles.container,
                    {
                        width: containerWidth,
                        height: containerHeight
                    }
                ]}
            >
                {
                    showSearch
                        ? (
                            <View style={styles.searchContainer}>
                                <Input
                                    {...omit(searchInputProps, ['value', 'onChangeText'])}
                                    value={keyword}
                                    style={styles.searchInput}
                                    wrapStyle={styles.searchInputWrap}
                                    onChangeText={handleKeywordChange}
                                    showSoftInputOnFocus={searchInputProps?.showSoftInputOnFocus ?? showSoftInputOnFocus}
                                />
                            </View>
                        )
                        : null
                }
                <ScrollView style={scrollViewStyle}>
                    { renderItems() }
                </ScrollView>
                <PickerFooter
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    { ...footerProps }
                />
            </View>
        </Mask>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    searchContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    searchInput: {
        height: 30,
        padding: 0
    },
    searchInputWrap: {
        height: 30
    }
});
