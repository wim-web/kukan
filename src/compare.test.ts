import { expect, test } from 'vitest'
import { CompareFn, toCompareByOperator } from './compare'



test('toCompareByOperator Test', () => {
    const baseCompareFn: CompareFn<number> = (left, right) => left - right < 0 ? -1 : left - right > 0 ? 1 : 0

    const cmp = toCompareByOperator(baseCompareFn)

    expect(cmp(1, "=", 1)).toBe(true)
    expect(cmp(1, "=", 2)).toBe(false)

    expect(cmp(1, "!=", 2)).toBe(true)
    expect(cmp(1, "!=", 1)).toBe(false)

    expect(cmp(1, "<", 1)).toBe(false)
    expect(cmp(1, "<", 2)).toBe(true)
    expect(cmp(1, "<", 0)).toBe(false)

    expect(cmp(1, ">", 1)).toBe(false)
    expect(cmp(1, ">", 2)).toBe(false)
    expect(cmp(1, ">", 0)).toBe(true)

    expect(cmp(1, "<=", 1)).toBe(true)
    expect(cmp(1, "<=", 2)).toBe(true)
    expect(cmp(1, "<=", 0)).toBe(false)

    expect(cmp(1, "=>", 1)).toBe(true)
    expect(cmp(1, "=>", 2)).toBe(false)
    expect(cmp(1, "=>", 0)).toBe(true)
})
