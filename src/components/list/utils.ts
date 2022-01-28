import { Children, cloneElement, ReactNode, RefObject, FC, ComponentType, isValidElement } from 'react'
import {
    NativeSyntheticEvent,
    TextInputFocusEventData,
    TextInputProps
} from 'react-native'
import { IInputConfig } from './interface'

export function mapChildrenWithRef<T>(
    children: ReactNode | undefined,
    ref: RefObject<T>,
    inputComponent: FC | ComponentType,
    config: IInputConfig,
    handleFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>, inputProps: TextInputProps) => void
): ReactNode | undefined {
    return Children.map(children, c => {
        if (!isValidElement(c)) {
            return c
        }
        
        if (c.type === inputComponent) {
            return cloneElement(c, {
                ref,
                showSoftInputOnFocus: c.props.showSoftInputOnFocus ?? config.showSoftInputOnFocus,
                onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => handleFocus(e, c.props)
            })
        }

        return cloneElement(c, {}, mapChildrenWithRef(c.props.children, ref, inputComponent, config, handleFocus))
    })
}
