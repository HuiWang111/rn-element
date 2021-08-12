import regExp from '../regExp';

describe('test pattern', () => {
    it('number should work', () => {
        expect(regExp.number.test('a1')).toBe(false);
        expect(regExp.number.test('-a1')).toBe(false);
        expect(regExp.number.test('1a')).toBe(false);
        expect(regExp.number.test('-1a')).toBe(false);
        expect(regExp.number.test('1')).toBe(true);
        expect(regExp.number.test('-1')).toBe(true);
        expect(regExp.number.test('1.22')).toBe(true);
        expect(regExp.number.test('-1.22')).toBe(true);
        expect(regExp.number.test('-1.')).toBe(true);
        expect(regExp.number.test('1.')).toBe(true);
        expect(regExp.number.test('0')).toBe(true);
        expect(regExp.number.test('-0')).toBe(true);
        expect(regExp.number.test('-0.')).toBe(true);
    });

    it('integer should work', () => {
        expect(regExp.integer.test('a1')).toBe(false);
        expect(regExp.integer.test('-a1')).toBe(false);
        expect(regExp.integer.test('1a')).toBe(false);
        expect(regExp.integer.test('-1a')).toBe(false);
        expect(regExp.integer.test('1')).toBe(true);
        expect(regExp.integer.test('-1')).toBe(true);
        expect(regExp.integer.test('1.22')).toBe(false);
        expect(regExp.integer.test('-1.22')).toBe(false);
        expect(regExp.integer.test('-1.00')).toBe(false);
        expect(regExp.integer.test('-1.')).toBe(true);
        expect(regExp.integer.test('1.')).toBe(true);
        expect(regExp.integer.test('0')).toBe(true);
        expect(regExp.integer.test('-0.')).toBe(true);
    });

    it('float should work', () => {
        expect(regExp.float.test('a1')).toBe(false);
        expect(regExp.float.test('-a1')).toBe(false);
        expect(regExp.float.test('1a')).toBe(false);
        expect(regExp.float.test('-1a')).toBe(false);
        expect(regExp.float.test('1')).toBe(false);
        expect(regExp.float.test('-1')).toBe(false);
        expect(regExp.float.test('1.22')).toBe(true);
        expect(regExp.float.test('-1.22')).toBe(true);
        expect(regExp.float.test('-1.00')).toBe(true);
        expect(regExp.float.test('-1.')).toBe(false);
        expect(regExp.float.test('-0.')).toBe(false);
        expect(regExp.float.test('0')).toBe(false);
    });

    it('positive should work', () => {
        expect(regExp.positive.test('a1')).toBe(false);
        expect(regExp.positive.test('-a1')).toBe(false);
        expect(regExp.positive.test('1a')).toBe(false);
        expect(regExp.positive.test('-1a')).toBe(false);
        expect(regExp.positive.test('1')).toBe(true);
        expect(regExp.positive.test('-1')).toBe(false);
        expect(regExp.positive.test('1.22')).toBe(true);
        expect(regExp.positive.test('-1.22')).toBe(false);
        expect(regExp.positive.test('-1.00')).toBe(false);
        expect(regExp.positive.test('-1.')).toBe(false);
        expect(regExp.positive.test('1.')).toBe(true);
    });

    it('negative should work', () => {
        expect(regExp.negative.test('a1')).toBe(false);
        expect(regExp.negative.test('-a1')).toBe(false);
        expect(regExp.negative.test('1a')).toBe(false);
        expect(regExp.negative.test('-1a')).toBe(false);
        expect(regExp.negative.test('1')).toBe(false);
        expect(regExp.negative.test('-1')).toBe(true);
        expect(regExp.negative.test('1.22')).toBe(false);
        expect(regExp.negative.test('-1.22')).toBe(true);
        expect(regExp.negative.test('-1.00')).toBe(true);
        expect(regExp.negative.test('-1.')).toBe(true);
        expect(regExp.negative.test('1.')).toBe(false);
    });

    it('posInteger should work', () => {
        expect(regExp.posInteger.test('a1')).toBe(false);
        expect(regExp.posInteger.test('-a1')).toBe(false);
        expect(regExp.posInteger.test('1a')).toBe(false);
        expect(regExp.posInteger.test('-1a')).toBe(false);
        expect(regExp.posInteger.test('1')).toBe(true);
        expect(regExp.posInteger.test('-1')).toBe(false);
        expect(regExp.posInteger.test('1.22')).toBe(false);
        expect(regExp.posInteger.test('-1.22')).toBe(false);
        expect(regExp.posInteger.test('-1.00')).toBe(false);
        expect(regExp.posInteger.test('-1.')).toBe(false);
        expect(regExp.posInteger.test('1.')).toBe(true);
    });

    it('negInteger should work', () => {
        expect(regExp.negInteger.test('a1')).toBe(false);
        expect(regExp.negInteger.test('-a1')).toBe(false);
        expect(regExp.negInteger.test('1a')).toBe(false);
        expect(regExp.negInteger.test('-1a')).toBe(false);
        expect(regExp.negInteger.test('1')).toBe(false);
        expect(regExp.negInteger.test('-1')).toBe(true);
        expect(regExp.negInteger.test('1.22')).toBe(false);
        expect(regExp.negInteger.test('-1.22')).toBe(false);
        expect(regExp.negInteger.test('-1.00')).toBe(false);
        expect(regExp.negInteger.test('-1.')).toBe(true);
        expect(regExp.negInteger.test('1.')).toBe(false);
    });

    it('posFloat should work', () => {
        expect(regExp.posFloat.test('a1')).toBe(false);
        expect(regExp.posFloat.test('-a1')).toBe(false);
        expect(regExp.posFloat.test('1a')).toBe(false);
        expect(regExp.posFloat.test('-1a')).toBe(false);
        expect(regExp.posFloat.test('1')).toBe(false);
        expect(regExp.posFloat.test('-1')).toBe(false);
        expect(regExp.posFloat.test('1.22')).toBe(true);
        expect(regExp.posFloat.test('-1.22')).toBe(false);
        expect(regExp.posFloat.test('-1.00')).toBe(false);
        expect(regExp.posFloat.test('1.00')).toBe(true);
        expect(regExp.posFloat.test('-1.')).toBe(false);
        expect(regExp.posFloat.test('1.')).toBe(false);
    });

    it('negFloat should work', () => {
        expect(regExp.negFloat.test('a1')).toBe(false);
        expect(regExp.negFloat.test('-a1')).toBe(false);
        expect(regExp.negFloat.test('1a')).toBe(false);
        expect(regExp.negFloat.test('-1a')).toBe(false);
        expect(regExp.negFloat.test('1')).toBe(false);
        expect(regExp.negFloat.test('-1')).toBe(false);
        expect(regExp.negFloat.test('1.22')).toBe(false);
        expect(regExp.negFloat.test('-1.22')).toBe(true);
        expect(regExp.negFloat.test('-1.00')).toBe(true);
        expect(regExp.negFloat.test('1.00')).toBe(false);
        expect(regExp.negFloat.test('-1.')).toBe(false);
        expect(regExp.negFloat.test('1.')).toBe(false);
    });
});
