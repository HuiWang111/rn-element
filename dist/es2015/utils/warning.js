export function warning(isValid, msg) {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof console !== 'undefined' && !isValid && console.error) {
            console.error(msg);
        }
    }
}
