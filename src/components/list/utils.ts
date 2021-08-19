import { Children, cloneElement, ReactElement, ReactNode, RefObject, FC, ComponentType } from 'react';
import { IInputConfig } from './interface';
import { isUndefined } from '../../utils';

export function mapChildrenWithRef<T>(
    children: ReactNode | undefined,
    ref: RefObject<T>,
    inputComponent: FC | ComponentType,
    config: IInputConfig
): ReactNode | undefined {
    return Children.map(children, child => {
        const c = child as ReactElement;
        
        if (c.type === inputComponent) {
            return cloneElement(c, {
                ref,
                showSoftInputOnFocus: isUndefined(c.props.showSoftInputOnFocus)
                    ? config.showSoftInputOnFocus
                    : c.props.showSoftInputOnFocus
            });
        }

        return cloneElement(c, {}, mapChildrenWithRef(c.props.children, ref, inputComponent, config));
    })
}
