export type CompareFn<T> = (left: T, right: T) => CompareResult;
export declare enum CompareResult {
    Equal = 0,
    RightIsGreater = -1,
    LeftIsGreater = 1
}
export declare const numberCompareFn: CompareFn<number>;
type op = "=" | "<" | ">" | "<=" | "=>" | "!=";
export type cmp<T> = (t1: T, op: op, t2: T) => boolean;
export declare function toCompareByOperator<T>(fn: CompareFn<T>): cmp<T>;
export {};
