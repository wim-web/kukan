export type CompareFn<T> = (left: T, right: T) => CompareResult
export enum CompareResult {
    Equal = 0,
    RightIsGreater = -1,
    LeftIsGreater = 1
}

export const numberCompareFn: CompareFn<number> = (left, right) => {
    const r = left - right
    return r < 0 ? CompareResult.RightIsGreater : r > 0 ? CompareResult.LeftIsGreater : CompareResult.Equal
}

type op = "=" | "<" | ">" | "<=" | "=>" | "!="
export type cmp<T> = (t1: T, op: op, t2: T) => boolean

export function toCompareByOperator<T>(fn: CompareFn<T>): cmp<T> {
    const f = (t1: T, op: op, t2: T): boolean => {
        const result = fn(t1, t2)

        switch (op) {
            case "=": return result === CompareResult.Equal
            case "!=": return result !== CompareResult.Equal
            case "<": return result === CompareResult.RightIsGreater
            case ">": return result === CompareResult.LeftIsGreater
            case "<=": return f(t1, "<", t2) || f(t1, "=", t2)
            case "=>": return f(t1, ">", t2) || f(t1, "=", t2)
            default:
                const _: never = op
                throw new Error("not implemented");
        }
    }

    return f
}
