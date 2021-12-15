import { Children, cloneElement } from 'react';
export function mapChildrenWithRef(children, ref, inputComponent, config, handleFocus) {
    return Children.map(children, child => {
        var _a;
        const c = child;
        if (c.type === inputComponent) {
            return cloneElement(c, {
                ref,
                showSoftInputOnFocus: (_a = c.props.showSoftInputOnFocus) !== null && _a !== void 0 ? _a : config.showSoftInputOnFocus,
                onFocus: (e) => handleFocus(e, c.props)
            });
        }
        return cloneElement(c, {}, mapChildrenWithRef(c.props.children, ref, inputComponent, config, handleFocus));
    });
}
