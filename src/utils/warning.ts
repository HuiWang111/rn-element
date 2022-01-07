export function warning(isValid: boolean, msg: string): void {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof console !== 'undefined' && !isValid && console.error) {
            console.error(msg)
        }
    }
}