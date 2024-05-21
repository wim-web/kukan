import { Bound } from "./bound"
import { CompareFn, CompareResult } from "./compare"
import { BoundedInterval, Interval, IntervalHasValue } from "./interval"

export class Open<T> extends BoundedInterval<T> {
    constructor(
        left: NonNullable<T>,
        right: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Open(left),
            new Bound.Open(right),
            compareFn,
        )
    }
}

export class RightHalfOpen<T> extends BoundedInterval<T> {
    constructor(
        left: NonNullable<T>,
        right: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Closed(left),
            new Bound.Open(right),
            compareFn,
        )
    }
}

export class LeftHalfOpen<T> extends BoundedInterval<T> {
    constructor(
        left: NonNullable<T>,
        right: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Open(left),
            new Bound.Closed(right),
            compareFn,
        )
    }
}

export class Closed<T> extends IntervalHasValue<T> {
    constructor(
        left: NonNullable<T>,
        right: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Closed(left),
            new Bound.Closed(right),
            compareFn,
        )
    }
}

export class UnboundedClosedRight<T> extends IntervalHasValue<T> {
    constructor(
        right: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Unbounded(),
            new Bound.Closed(right),
            compareFn,
        )
    }
}

export class UnboundedOpenRight<T> extends IntervalHasValue<T> {
    constructor(
        right: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Unbounded(),
            new Bound.Open(right),
            compareFn,
        )
    }
}

export class UnboundedClosedLeft<T> extends IntervalHasValue<T> {
    constructor(
        left: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Closed(left),
            new Bound.Unbounded(),
            compareFn,
        )
    }
}

export class UnboundedOpenLeft<T> extends IntervalHasValue<T> {
    constructor(
        left: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Open(left),
            new Bound.Unbounded(),
            compareFn,
        )
    }
}

export class Singleton<T> extends IntervalHasValue<T> {
    constructor(
        point: NonNullable<T>,
        compareFn: CompareFn<T>,
    ) {
        super(
            new Bound.Closed(point),
            new Bound.Closed(point),
            compareFn,
        )
    }
}

export class Unbounded<T> extends Interval<T> {
    constructor() {
        super(
            new Bound.Unbounded(),
            new Bound.Unbounded(),
        )
    }
}

export class Empty<T> extends Interval<T> {
    constructor() {
        super(
            new Bound.None(),
            new Bound.None(),
        )
    }
}

