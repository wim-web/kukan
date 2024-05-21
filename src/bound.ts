import { CompareFn, CompareResult, toCompareByOperator } from "./compare"

export namespace Bound {
    export type Bound<T> = Closed<T> | Open<T> | Unbounded | None

    export const compareBound = <T>(compareFnT: CompareFn<T>) => {
        const cmp: CompareFn<Open<T> | Closed<T>> = (left, right) => {
            if (left instanceof Closed && right instanceof Closed) {
                return compareFnT(left.value, right.value)
            }

            if (left instanceof Open && right instanceof Open) {
                return compareFnT(left.value, right.value)
            }

            if (left instanceof Open && right instanceof Closed) {
                const r = compareFnT(left.value, right.value)
                return r === CompareResult.Equal ? CompareResult.RightIsGreater : r
            }

            if (left instanceof Closed && right instanceof Open) {
                const r = compareFnT(left.value, right.value)
                return r === CompareResult.Equal ? CompareResult.LeftIsGreater : r
            }

            throw new Error("not reached")
        }

        return toCompareByOperator(cmp)
    }

    export class Open<T> {
        constructor(readonly value: NonNullable<T>) { }
    }

    export class Closed<T> {
        constructor(readonly value: NonNullable<T>) { }
    }

    export class Unbounded {
        readonly value = null
    }

    export class None {
        readonly value = undefined
    }
}

