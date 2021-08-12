import { FC, PropsWithChildren, ReactElement } from 'react';
import { useKeyEvents } from '../../hooks';
import { KeyCode } from '../../constants';
import { IEnterableProps } from './interface';
import PropTypes from 'prop-types';

export const Enterable: FC<PropsWithChildren<IEnterableProps>> = ({
    onEnter,
    isEnterable = true,
    children
}: PropsWithChildren<IEnterableProps>) => {
    useKeyEvents('keyup', (event): void => {
        if (event.which === KeyCode.Enter && isEnterable) {
            onEnter && onEnter();
        }
    }, [isEnterable]);

    return children as ReactElement;
}

Enterable.propTypes = {
    onEnter: PropTypes.func,
    isEnterable: PropTypes.bool
};
