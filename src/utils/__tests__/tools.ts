import { omit, keyBy, isArrayShallowEqual } from '../tools'

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

        expect(omit()).toEqual({})

        expect(omit({ a: 1, b: 2, c: [] })).toEqual({ a: 1, b: 2, c: [] })
    })

    it('keyBy should work', () => {
        const array = [
            { 'dir': 'left', 'code': 97 },
            { 'dir': 'right', 'code': 100 },
            { 'dir': 'left', 'code': 98 }
        ]

        expect(
            keyBy(array, function(o) {
                return String.fromCharCode(o.code)
            })
        ).toEqual({ 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 }, 'b': { 'dir': 'left', 'code': 98 } })

        expect(keyBy(array, 'dir')).toEqual({ 'left': { 'dir': 'left', 'code': 98 }, 'right': { 'dir': 'right', 'code': 100 } })
    })

    it('isArrayShallowEqual should work', () => {
        expect(isArrayShallowEqual([], [])).toBe(true)
        expect(isArrayShallowEqual([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true)
        expect(isArrayShallowEqual([1, 2, 3, 4], [1, 2, 4, 3])).toBe(false)
        expect(isArrayShallowEqual([1, 2, 3, 4], [1, 2, 3])).toBe(false)
    })
})