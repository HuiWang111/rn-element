import { cloneElement, FC, PropsWithChildren, ReactElement } from 'react';
import { useEnter } from '../../hooks';
import { IEnterableProps } from './interface';
import PropTypes from 'prop-types';

export const Enterable: FC<PropsWithChildren<IEnterableProps>> = ({
    onEnter,
    isEnterable = true,
    children,
    ...restProps
}: PropsWithChildren<IEnterableProps>) => {
    useEnter(() => {
        if (isEnterable) {
            onEnter?.();
        }
    }, [isEnterable]);

    return cloneElement(children as ReactElement, {
        ...restProps
    });
}

Enterable.displayName = 'Enterable';

Enterable.propTypes = {
    onEnter: PropTypes.func,
    isEnterable: PropTypes.bool
};
