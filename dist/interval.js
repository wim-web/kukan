"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundedInterval = exports.IntervalHasValue = exports.Interval = void 0;
var bound_1 = require("./bound");
var compare_1 = require("./compare");
var intervals_1 = require("./intervals");
var Interval = /** @class */ (function () {
    function Interval(left, right) {
        this.left = left;
        this.right = right;
    }
    return Interval;
}());
exports.Interval = Interval;
var IntervalHasValue = /** @class */ (function (_super) {
    __extends(IntervalHasValue, _super);
    function IntervalHasValue(left, right, compareValueFn) {
        var _this = _super.call(this, left, right) || this;
        _this.compareValueFn = compareValueFn;
        _this.compareBoundFn = bound_1.Bound.compareBound(compareValueFn);
        return _this;
    }
    IntervalHasValue.prototype.isIntersect = function (other) {
        return !(this.intersect(other) instanceof intervals_1.Empty);
    };
    IntervalHasValue.prototype.intersect = function (other) {
        var _this = this;
        if (this instanceof intervals_1.Empty || other instanceof intervals_1.Empty) {
            return new intervals_1.Empty();
        }
        if (this instanceof intervals_1.Unbounded) {
            return other;
        }
        if (other instanceof intervals_1.Unbounded) {
            return this;
        }
        var left = (function () {
            if (_this.left instanceof bound_1.Bound.None || other.left instanceof bound_1.Bound.None) {
                throw new Error("unexpected error: none");
            }
            if (_this.left instanceof bound_1.Bound.Unbounded) {
                return other.left;
            }
            if (other.left instanceof bound_1.Bound.Unbounded) {
                return _this.left;
            }
            return _this.compareBoundFn(_this.left, ">", other.left) ? _this.left : other.left;
        })();
        var right = (function () {
            if (_this.right instanceof bound_1.Bound.None || other.right instanceof bound_1.Bound.None) {
                throw new Error("unexpected error: none");
            }
            if (_this.right instanceof bound_1.Bound.Unbounded) {
                return other.right;
            }
            if (other.right instanceof bound_1.Bound.Unbounded) {
                return _this.right;
            }
            return _this.compareBoundFn(_this.right, "<", other.right) ? _this.right : other.right;
        })();
        return generateInterval(left, right, this.compareValueFn);
    };
    return IntervalHasValue;
}(Interval));
exports.IntervalHasValue = IntervalHasValue;
var BoundedInterval = /** @class */ (function (_super) {
    __extends(BoundedInterval, _super);
    function BoundedInterval(left, right, compareFn) {
        if (compareFn(left.value, right.value) === compare_1.CompareResult.LeftIsGreater) {
            throw new Error("not allowed that since > until");
        }
        return _super.call(this, left, right, compareFn) || this;
    }
    return BoundedInterval;
}(IntervalHasValue));
exports.BoundedInterval = BoundedInterval;
function generateInterval(left, right, compareValueFn) {
    var compareBoundFn = bound_1.Bound.compareBound(compareValueFn);
    if (left instanceof bound_1.Bound.None || right instanceof bound_1.Bound.None) {
        return new intervals_1.Empty();
    }
    if (left instanceof bound_1.Bound.Unbounded) {
        if (right instanceof bound_1.Bound.Closed) {
            return new intervals_1.UnboundedClosedRight(right.value, compareValueFn);
        }
        if (right instanceof bound_1.Bound.Open) {
            return new intervals_1.UnboundedOpenRight(right.value, compareValueFn);
        }
        return new intervals_1.Unbounded();
    }
    if (right instanceof bound_1.Bound.Unbounded) {
        if (left instanceof bound_1.Bound.Closed) {
            return new intervals_1.UnboundedClosedLeft(left.value, compareValueFn);
        }
        if (left instanceof bound_1.Bound.Open) {
            return new intervals_1.UnboundedOpenLeft(left.value, compareValueFn);
        }
        return new intervals_1.Unbounded();
    }
    if (compareBoundFn(left, ">", right)) {
        return new intervals_1.Empty();
    }
    if (compareBoundFn(left, "=", right)) {
        return new intervals_1.Singleton(left.value, compareValueFn);
    }
    if (left instanceof bound_1.Bound.Closed && right instanceof bound_1.Bound.Closed) {
        return new intervals_1.Closed(left.value, right.value, compareValueFn);
    }
    if (left instanceof bound_1.Bound.Open && right instanceof bound_1.Bound.Open) {
        return new intervals_1.Open(left.value, right.value, compareValueFn);
    }
    if (left instanceof bound_1.Bound.Closed && right instanceof bound_1.Bound.Open) {
        return new intervals_1.RightHalfOpen(left.value, right.value, compareValueFn);
    }
    if (left instanceof bound_1.Bound.Open && right instanceof bound_1.Bound.Closed) {
        return new intervals_1.LeftHalfOpen(left.value, right.value, compareValueFn);
    }
    throw new Error("Invalid interval bounds");
}
