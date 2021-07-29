import { getType, isInteger, isFloat } from './validate';

describe('test validate,ts', () => {
    it('getType should work', () => {
        expect(getType('')).toBe('string');
        expect(getType(new String())).toBe('string');
        expect(getType(true)).toBe('boolean');
        expect(getType(new Boolean())).toBe('boolean');
        expect(getType(() => {})).toBe('function');
        expect(getType(new Function())).toBe('function');
        expect(getType(undefined)).toBe('undefined');
        expect(getType(null)).toBe('null');
        expect(getType(3)).toBe('number');
        expect(getType(new Number('3'))).toBe('number');
        expect(getType([])).toBe('array');
        expect(getType(new Array())).toBe('array');
        expect(getType({})).toBe('object');
        expect(getType(new Object())).toBe('object');

        expect(getType(5, true)).toBe('integer');
        expect(getType(5.0, true)).toBe('integer');
        expect(getType(new Number('5'), true)).toBe('integer');
        expect(getType(5.5, true)).toBe('float');
        expect(getType(new Number('5.5'), true)).toBe('float');
    });

    it('isInteger should work', () => {
        expect(isInteger(1)).toBe(true);
        expect(isInteger(1.0)).toBe(true);
        expect(isInteger(1.1)).toBe(false);
    });

    it('isFloat should work', () => {
        expect(isFloat(1)).toBe(false);
        expect(isFloat(1.0)).toBe(false);
        expect(isFloat(1.1)).toBe(true);
    });
});