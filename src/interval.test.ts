import { assert, expect, test } from 'vitest'
import { Closed, Empty, LeftHalfOpen, Open, RightHalfOpen, Singleton, Unbounded } from './intervals'
import { numberCompareFn } from './compare'

test('intersect same intervals', () => {
    const interval1 = new Open(1, 2, numberCompareFn)
    const interval2 = new Open(1, 2, numberCompareFn)

    const newInterval = interval1.intersect(interval2)

    assert(newInterval instanceof Open)
    expect(newInterval.left.value).toBe(1)
    expect(newInterval.right.value).toBe(2)
})

test('intersect with different intervals', () => {
    const interval1 = new RightHalfOpen(1, 3, numberCompareFn)
    const interval2 = new LeftHalfOpen(2, 4, numberCompareFn)

    const newInterval = interval1.intersect(interval2)

    assert(newInterval instanceof Open)
    expect(newInterval.left.value).toBe(2)
    expect(newInterval.right.value).toBe(3)
})

test('intersect with unbounded interval', () => {
    const interval1 = new Open(1, 2, numberCompareFn)
    const interval2 = new Unbounded<number>()

    const newInterval = interval1.intersect(interval2)

    assert(newInterval instanceof Open)
    expect(newInterval.left.value).toBe(1)
    expect(newInterval.right.value).toBe(2)
})

test('intersect with empty interval', () => {
    const interval1 = new Open(1, 2, numberCompareFn)
    const interval2 = new Empty<number>()

    const newInterval = interval1.intersect(interval2)

    assert(newInterval instanceof Empty)
})

test('intersect with singleton interval', () => {
    const interval1 = new Closed(1, 3, numberCompareFn)
    const interval2 = new Singleton(2, numberCompareFn)

    const newInterval = interval1.intersect(interval2)

    assert(newInterval instanceof Singleton)
    expect(newInterval.left.value).toBe(2)
    expect(newInterval.right.value).toBe(2)
})

test('intersect with overlapping intervals', () => {
    const interval1 = new Closed(1, 5, numberCompareFn)
    const interval2 = new Closed(3, 7, numberCompareFn)

    const newInterval = interval1.intersect(interval2)

    assert(newInterval instanceof Closed)
    expect(newInterval.left.value).toBe(3)
    expect(newInterval.right.value).toBe(5)
})

test('intersect with non-overlapping intervals', () => {
    const interval1 = new Closed(1, 2, numberCompareFn)
    const interval2 = new Closed(3, 4, numberCompareFn)

    const newInterval = interval1.intersect(interval2)

    assert(newInterval instanceof Empty)
})
