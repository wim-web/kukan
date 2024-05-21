import { Bound } from "./bound"
import { CompareFn, CompareResult, cmp } from "./compare"
import { Closed, Empty, LeftHalfOpen, Open, RightHalfOpen, Singleton, Unbounded, UnboundedClosedLeft, UnboundedClosedRight, UnboundedOpenLeft, UnboundedOpenRight } from "./intervals"

export abstract class Interval<T> {
    constructor(
        readonly left: Bound.Bound<T>,
        readonly right: Bound.Bound<T>,
    ) { }
}

export abstract class IntervalHasValue<T> extends Interval<T> {
    private readonly compareValueFn: CompareFn<T>
    private readonly compareBoundFn: cmp<Bound.Open<T> | Bound.Closed<T>>

    constructor(
        left: Bound.Bound<T>,
        right: Bound.Bound<T>,
        compareValueFn: CompareFn<T>
    ) {
        super(
            left,
            right
        )

        this.compareValueFn = compareValueFn
        this.compareBoundFn = Bound.compareBound(compareValueFn)
    }

    isIntersect(other: Interval<T>): boolean {
        return !(this.intersect(other) instanceof Empty)
    }

    intersect(other: Interval<T>): Interval<T> {
        if (this instanceof Empty || other instanceof Empty) {
            return new Empty()
        }

        if (this instanceof Unbounded) {
            return other
        }

        if (other instanceof Unbounded) {
            return this
        }

        const left = (() => {
            if (this.left instanceof Bound.None || other.left instanceof Bound.None) {
                throw new Error("unexpected error: none")
            }

            if (this.left instanceof Bound.Unbounded) {
                return other.left
            }

            if (other.left instanceof Bound.Unbounded) {
                return this.left
            }

            return this.compareBoundFn(this.left, ">", other.left) ? this.left : other.left
        })()

        const right = (() => {
            if (this.right instanceof Bound.None || other.right instanceof Bound.None) {
                throw new Error("unexpected error: none")
            }

            if (this.right instanceof Bound.Unbounded) {
                return other.right
            }

            if (other.right instanceof Bound.Unbounded) {
                return this.right
            }

            return this.compareBoundFn(this.right, "<", other.right) ? this.right : other.right
        })()

        return generateInterval(left, right, this.compareValueFn)
    }
}

export abstract class BoundedInterval<T> extends IntervalHasValue<T> {
    constructor(
        left: Bound.Open<T> | Bound.Closed<T>,
        right: Bound.Open<T> | Bound.Closed<T>,
        compareFn: CompareFn<T>
    ) {
        if (compareFn(left.value, right.value) === CompareResult.LeftIsGreater) {
            throw new Error("not allowed that since > until")
        }

        super(
            left,
            right,
            compareFn,
        )
    }
}

function generateInterval<T>(left: Bound.Bound<T>, right: Bound.Bound<T>, compareValueFn: CompareFn<T>): Interval<T> {
    const compareBoundFn = Bound.compareBound(compareValueFn)

    if (left instanceof Bound.None || right instanceof Bound.None) {
        return new Empty()
    }

    if (left instanceof Bound.Unbounded) {
        if (right instanceof Bound.Closed) {
            return new UnboundedClosedRight(right.value, compareValueFn)
        }
        if (right instanceof Bound.Open) {
            return new UnboundedOpenRight(right.value, compareValueFn)
        }
        return new Unbounded()
    }

    if (right instanceof Bound.Unbounded) {
        if (left instanceof Bound.Closed) {
            return new UnboundedClosedLeft(left.value, compareValueFn)
        }
        if (left instanceof Bound.Open) {
            return new UnboundedOpenLeft(left.value, compareValueFn)
        }
        return new Unbounded()
    }

    if (compareBoundFn(left, ">", right)) {
        return new Empty()
    }

    if (compareBoundFn(left, "=", right)) {
        return new Singleton(left.value, compareValueFn)
    }

    if (left instanceof Bound.Closed && right instanceof Bound.Closed) {
        return new Closed(left.value, right.value, compareValueFn)
    }

    if (left instanceof Bound.Open && right instanceof Bound.Open) {
        return new Open(left.value, right.value, compareValueFn)
    }

    if (left instanceof Bound.Closed && right instanceof Bound.Open) {
        return new RightHalfOpen(left.value, right.value, compareValueFn)
    }

    if (left instanceof Bound.Open && right instanceof Bound.Closed) {
        return new LeftHalfOpen(left.value, right.value, compareValueFn)
    }

    throw new Error("Invalid interval bounds")
}
