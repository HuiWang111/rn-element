import { ReactNode, RefObject, FC, ComponentType } from 'react';
import { IInputConfig } from './interface';
export declare function mapChildrenWithRef<T>(children: ReactNode | undefined, ref: RefObject<T>, inputComponent: FC | ComponentType, config: IInputConfig): ReactNode | undefined;
