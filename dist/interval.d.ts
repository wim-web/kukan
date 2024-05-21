import { Bound } from "./bound";
import { CompareFn } from "./compare";
export declare abstract class Interval<T> {
    readonly left: Bound.Bound<T>;
    readonly right: Bound.Bound<T>;
    constructor(left: Bound.Bound<T>, right: Bound.Bound<T>);
}
export declare abstract class IntervalHasValue<T> extends Interval<T> {
    private readonly compareValueFn;
    private readonly compareBoundFn;
    constructor(left: Bound.Bound<T>, right: Bound.Bound<T>, compareValueFn: CompareFn<T>);
    isIntersect(other: Interval<T>): boolean;
    intersect(other: Interval<T>): Interval<T>;
}
export declare abstract class BoundedInterval<T> extends IntervalHasValue<T> {
    constructor(left: Bound.Open<T> | Bound.Closed<T>, right: Bound.Open<T> | Bound.Closed<T>, compareFn: CompareFn<T>);
}
