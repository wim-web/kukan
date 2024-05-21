"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bound = void 0;
var compare_1 = require("./compare");
var Bound;
(function (Bound) {
    Bound.compareBound = function (compareFnT) {
        var cmp = function (left, right) {
            if (left instanceof Closed && right instanceof Closed) {
                return compareFnT(left.value, right.value);
            }
            if (left instanceof Open && right instanceof Open) {
                return compareFnT(left.value, right.value);
            }
            if (left instanceof Open && right instanceof Closed) {
                var r = compareFnT(left.value, right.value);
                return r === compare_1.CompareResult.Equal ? compare_1.CompareResult.RightIsGreater : r;
            }
            if (left instanceof Closed && right instanceof Open) {
                var r = compareFnT(left.value, right.value);
                return r === compare_1.CompareResult.Equal ? compare_1.CompareResult.LeftIsGreater : r;
            }
            throw new Error("not reached");
        };
        return (0, compare_1.toCompareByOperator)(cmp);
    };
    var Open = /** @class */ (function () {
        function Open(value) {
            this.value = value;
        }
        return Open;
    }());
    Bound.Open = Open;
    var Closed = /** @class */ (function () {
        function Closed(value) {
            this.value = value;
        }
        return Closed;
    }());
    Bound.Closed = Closed;
    var Unbounded = /** @class */ (function () {
        function Unbounded() {
            this.value = null;
        }
        return Unbounded;
    }());
    Bound.Unbounded = Unbounded;
    var None = /** @class */ (function () {
        function None() {
            this.value = undefined;
        }
        return None;
    }());
    Bound.None = None;
})(Bound || (exports.Bound = Bound = {}));
