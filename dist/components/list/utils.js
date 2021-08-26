import { Children, cloneElement } from 'react';
import { isUndefined } from '../../utils';
export function mapChildrenWithRef(children, ref, inputComponent, config) {
    return Children.map(children, child => {
        const c = child;
        if (c.type === inputComponent) {
            return cloneElement(c, {
                ref,
                showSoftInputOnFocus: isUndefined(c.props.showSoftInputOnFocus)
                    ? config.showSoftInputOnFocus
                    : c.props.showSoftInputOnFocus
            });
        }
        return cloneElement(c, {}, mapChildrenWithRef(c.props.children, ref, inputComponent, config));
    });
}
