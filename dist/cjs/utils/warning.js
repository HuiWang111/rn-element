"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warning = void 0;
function warning(isValid, msg) {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof console !== 'undefined' && !isValid && console.error) {
            console.error(msg);
        }
    }
}
exports.warning = warning;
