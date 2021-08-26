var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { cloneElement } from 'react';
import { useEnter } from '../../hooks';
import PropTypes from 'prop-types';
export const Enterable = (_a) => {
    var { onEnter, isEnterable = true, children } = _a, restProps = __rest(_a, ["onEnter", "isEnterable", "children"]);
    useEnter(() => {
        if (isEnterable) {
            onEnter === null || onEnter === void 0 ? void 0 : onEnter();
        }
    }, [isEnterable]);
    return cloneElement(children, Object.assign({}, restProps));
};
Enterable.displayName = 'Enterable';
Enterable.propTypes = {
    onEnter: PropTypes.func,
    isEnterable: PropTypes.bool
};
