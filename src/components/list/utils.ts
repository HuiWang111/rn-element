import { Children, cloneElement, ReactElement, ReactNode, RefObject, FC, ComponentType } from 'react';

export function mapChildrenWithRef<T>(
    children: ReactNode | undefined,
    ref: RefObject<T>,
    InputComponent: FC | ComponentType
): ReactNode | undefined {
    return Children.map(children, child => {
        const c = child as ReactElement;

        if (c.type === InputComponent) {
            if (!ref.current) {
                return cloneElement(c, {
                    ref
                });
            }

            return c;
        }

        if (c.props?.children) {
            c.props.children = mapChildrenWithRef(c.props.children, ref, InputComponent);
        }

        return c;
    })
}
