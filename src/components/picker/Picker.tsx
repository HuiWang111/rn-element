import React, {
    Children,
    cloneElement,
    FC,
    PropsWithChildren,
    ReactElement,
    ReactText,
    useEffect,
    useState
} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import { Mask } from './Mask';
import { IPickerProps } from './interface';
import { PickerFooter } from './PickerFooter';
import { PickerContext } from './context';
import { useArrowUp, useArrowDown } from '../../hooks';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Picker: FC<PropsWithChildren<IPickerProps>> = ({
    zIndex,
    maskStyle,
    children,
    value: propsValue,
    activeItemStyle,
    itemStyle,
    visible = false,
    onCancel,
    onConfirm
}: PropsWithChildren<IPickerProps>) => {
    const values: ReactText[] = Children.map(children, (item: ReactElement) => {
        return item.props?.value;
    }) || [];
    const [value, setValue] = useState<ReactText>(values[0] || '');

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

    const handleConfirm = (): void => {
        onConfirm?.(value);
    };

    const handleCancel = (): void => {
        onCancel?.();
    }
    
    return (
        <Mask
            zIndex={zIndex}
            style={{
                width: screenWidth,
                height: screenHeight,
                ...maskStyle
            }}
            visible={visible}
        >
            <View style={styles.container}>
                <ScrollView
                    style={styles.picker}
                >
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

const containerWidth = screenWidth - 40;
const containerHeight = screenHeight - 90;
const styles = StyleSheet.create({
    container: {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: '#fff'
    },
    picker: {
        height: containerHeight - 60
    }
});
