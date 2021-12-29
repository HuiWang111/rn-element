import { getDepth } from '../utils'

describe('test getDepth method', () => {
    it('getDepth should work when options is []', () => {
        expect(getDepth([])).toBe(0)
    })

    it(`getDepth should work when options's depth is 1`, () => {
        expect(getDepth([
            {
                label: '1',
                value: '1'
            },
            {
                label: '2',
                value: '2'
            },
            {
                label: '3',
                value: '3'
            }
        ])).toBe(1)
    })

    it(`getDepth should work when options's depth is 2`, () => {
        expect(getDepth([
            {
                label: '1',
                value: '1'
            },
            {
                label: '2',
                value: '2',
                children: [
                    {
                        label: '2-1',
                        value: '2-1'
                    },
                    {
                        label: '2-2',
                        value: '2-2'
                    }
                ]
            },
            {
                label: '3',
                value: '3'
            }
        ])).toBe(2)
    })

    it(`getDepth should work when options's depth is 3`, () => {
        expect(getDepth([
            {
                label: '1',
                value: '1'
            },
            {
                label: '2',
                value: '2',
                children: [
                    {
                        label: '2-1',
                        value: '2-1',
                        children: [
                            {
                                label: '2-1-1',
                                value: '2-1-1'
                            }
                        ]
                    },
                    {
                        label: '2-2',
                        value: '2-2'
                    }
                ]
            },
            {
                label: '3',
                value: '3',
                children: [
                    {
                        label: '3-1',
                        value: '3-1',
                        children: []
                    },
                    {
                        label: '3-2',
                        value: '3-2'
                    }
                ]
            }
        ])).toBe(3)
    })

    it(`getDepth should work when the second depth is []`, () => {
        expect(getDepth([
            {
                label: '1',
                value: '1'
            },
            {
                label: '2',
                value: '2',
                children: []
            },
            {
                label: '3',
                value: '3'
            }
        ])).toBe(1)
    })
})
