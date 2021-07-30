import { omit } from './tools';

describe('test tools', () => {
    it('omit should work', () => {
        expect(
            omit(
                {
                    a: 1,
                    b: 2,
                    c: []
                },
                ['c']
            )
        ).toEqual({ a: 1, b: 2 })

        expect(omit()).toEqual({});

        expect(omit({ a: 1, b: 2, c: [] })).toEqual({ a: 1, b: 2, c: [] })
    });
});