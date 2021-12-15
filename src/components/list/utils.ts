import { Children, cloneElement, ReactElement, ReactNode, RefObject, FC, ComponentType } from 'react';
import {
    NativeSyntheticEvent,
    TextInputFocusEventData,
    TextInputProps
} from 'react-native';
import { IInputConfig } from './interface';
import { isUndefined } from '../../utils';

export function mapChildrenWithRef<T>(
    children: ReactNode | undefined,
    ref: RefObject<T>,
    inputComponent: FC | ComponentType,
    config: IInputConfig,
    handleFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>, inputProps: TextInputProps) => void
): ReactNode | undefined {
    return Children.map(children, child => {
        const c = child as ReactElement;
        
        if (c.type === inputComponent) {
            return cloneElement(c, {
                ref,
                showSoftInputOnFocus: c.props.showSoftInputOnFocus ?? config.showSoftInputOnFocus,
                onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => handleFocus(e, c.props)
            });
        }

        return cloneElement(c, {}, mapChildrenWithRef(c.props.children, ref, inputComponent, config, handleFocus));
    })
}
