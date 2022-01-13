import { mergeStyle } from '../styles'

describe('test styles util', () => {
    it('mergeStyle should work', () => {
        expect(
            mergeStyle(
                {
                    test: {
                        width: 100,
                        height: 200
                    }
                },
                {
                    test: {
                        color: 'red'
                    }
                }
            )
        ).toEqual({
            test: {
                color: 'red'
            }
        })

        expect(
            mergeStyle(
                [
                    {
                        test: {
                            width: 100,
                            height: 200
                        }
                    }
                ],
                [
                    {
                        test: {
                            color: 'red'
                        }
                    }
                ]
            )
        ).toEqual({
            test: {
                color: 'red'
            }
        })

        expect(mergeStyle(null, null)).toBe(null)

        expect(
            mergeStyle(null, { test: { width: 100 } })
        ).toEqual({ test: { width: 100 } })

        expect(
            mergeStyle({ test: { width: 100 } }, null)
        ).toEqual({ test: { width: 100 } })
    })
})