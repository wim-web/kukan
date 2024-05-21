import { CompareFn } from "./compare";
export declare namespace Bound {
    type Bound<T> = Closed<T> | Open<T> | Unbounded | None;
    const compareBound: <T>(compareFnT: CompareFn<T>) => import("./compare").cmp<Open<T> | Closed<T>>;
    class Open<T> {
        readonly value: NonNullable<T>;
        constructor(value: NonNullable<T>);
    }
    class Closed<T> {
        readonly value: NonNullable<T>;
        constructor(value: NonNullable<T>);
    }
    class Unbounded {
        readonly value: null;
    }
    class None {
        readonly value: undefined;
    }
}
