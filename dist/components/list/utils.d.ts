import { ReactNode, RefObject, FC, ComponentType } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { IInputConfig } from './interface';
export declare function mapChildrenWithRef<T>(children: ReactNode | undefined, ref: RefObject<T>, inputComponent: FC | ComponentType, config: IInputConfig, handleFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>, inputProps: TextInputProps) => void): ReactNode | undefined;
