"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCompareByOperator = exports.numberCompareFn = exports.CompareResult = void 0;
var CompareResult;
(function (CompareResult) {
    CompareResult[CompareResult["Equal"] = 0] = "Equal";
    CompareResult[CompareResult["RightIsGreater"] = -1] = "RightIsGreater";
    CompareResult[CompareResult["LeftIsGreater"] = 1] = "LeftIsGreater";
})(CompareResult || (exports.CompareResult = CompareResult = {}));
var numberCompareFn = function (left, right) {
    var r = left - right;
    return r < 0 ? CompareResult.RightIsGreater : r > 0 ? CompareResult.LeftIsGreater : CompareResult.Equal;
};
exports.numberCompareFn = numberCompareFn;
function toCompareByOperator(fn) {
    var f = function (t1, op, t2) {
        var result = fn(t1, t2);
        switch (op) {
            case "=": return result === CompareResult.Equal;
            case "!=": return result !== CompareResult.Equal;
            case "<": return result === CompareResult.RightIsGreater;
            case ">": return result === CompareResult.LeftIsGreater;
            case "<=": return f(t1, "<", t2) || f(t1, "=", t2);
            case "=>": return f(t1, ">", t2) || f(t1, "=", t2);
            default:
                var _ = op;
                throw new Error("not implemented");
        }
    };
    return f;
}
exports.toCompareByOperator = toCompareByOperator;
