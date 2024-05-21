import { CompareFn } from "./compare";
import { BoundedInterval, Interval, IntervalHasValue } from "./interval";
export declare class Open<T> extends BoundedInterval<T> {
    constructor(left: NonNullable<T>, right: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class RightHalfOpen<T> extends BoundedInterval<T> {
    constructor(left: NonNullable<T>, right: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class LeftHalfOpen<T> extends BoundedInterval<T> {
    constructor(left: NonNullable<T>, right: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class Closed<T> extends IntervalHasValue<T> {
    constructor(left: NonNullable<T>, right: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class UnboundedClosedRight<T> extends IntervalHasValue<T> {
    constructor(right: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class UnboundedOpenRight<T> extends IntervalHasValue<T> {
    constructor(right: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class UnboundedClosedLeft<T> extends IntervalHasValue<T> {
    constructor(left: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class UnboundedOpenLeft<T> extends IntervalHasValue<T> {
    constructor(left: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class Singleton<T> extends IntervalHasValue<T> {
    constructor(point: NonNullable<T>, compareFn: CompareFn<T>);
}
export declare class Unbounded<T> extends Interval<T> {
    constructor();
}
export declare class Empty<T> extends Interval<T> {
    constructor();
}
