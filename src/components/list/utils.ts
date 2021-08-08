import { Children, cloneElement, ReactElement, ReactNode, RefObject, FC, ComponentType } from 'react';

export function mapChildrenWithRef<T>(
    children: ReactNode | undefined,
    ref: RefObject<T>,
    inputComponent: FC | ComponentType
): ReactNode | undefined {
    return Children.map(children, child => {
        const c = child as ReactElement;

        if (c.type === inputComponent) {
            if (!ref.current) {
                return cloneElement(c, {
                    ref
                });
            }

            return c;
        }

        if (c.props?.children) {
            c.props.children = mapChildrenWithRef(c.props.children, ref, inputComponent);
        }

        return c;
    })
}
