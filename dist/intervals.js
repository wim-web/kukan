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
exports.Empty = exports.Unbounded = exports.Singleton = exports.UnboundedOpenLeft = exports.UnboundedClosedLeft = exports.UnboundedOpenRight = exports.UnboundedClosedRight = exports.Closed = exports.LeftHalfOpen = exports.RightHalfOpen = exports.Open = void 0;
var bound_1 = require("./bound");
var interval_1 = require("./interval");
var Open = /** @class */ (function (_super) {
    __extends(Open, _super);
    function Open(left, right, compareFn) {
        return _super.call(this, new bound_1.Bound.Open(left), new bound_1.Bound.Open(right), compareFn) || this;
    }
    return Open;
}(interval_1.BoundedInterval));
exports.Open = Open;
var RightHalfOpen = /** @class */ (function (_super) {
    __extends(RightHalfOpen, _super);
    function RightHalfOpen(left, right, compareFn) {
        return _super.call(this, new bound_1.Bound.Closed(left), new bound_1.Bound.Open(right), compareFn) || this;
    }
    return RightHalfOpen;
}(interval_1.BoundedInterval));
exports.RightHalfOpen = RightHalfOpen;
var LeftHalfOpen = /** @class */ (function (_super) {
    __extends(LeftHalfOpen, _super);
    function LeftHalfOpen(left, right, compareFn) {
        return _super.call(this, new bound_1.Bound.Open(left), new bound_1.Bound.Closed(right), compareFn) || this;
    }
    return LeftHalfOpen;
}(interval_1.BoundedInterval));
exports.LeftHalfOpen = LeftHalfOpen;
var Closed = /** @class */ (function (_super) {
    __extends(Closed, _super);
    function Closed(left, right, compareFn) {
        return _super.call(this, new bound_1.Bound.Closed(left), new bound_1.Bound.Closed(right), compareFn) || this;
    }
    return Closed;
}(interval_1.IntervalHasValue));
exports.Closed = Closed;
var UnboundedClosedRight = /** @class */ (function (_super) {
    __extends(UnboundedClosedRight, _super);
    function UnboundedClosedRight(right, compareFn) {
        return _super.call(this, new bound_1.Bound.Unbounded(), new bound_1.Bound.Closed(right), compareFn) || this;
    }
    return UnboundedClosedRight;
}(interval_1.IntervalHasValue));
exports.UnboundedClosedRight = UnboundedClosedRight;
var UnboundedOpenRight = /** @class */ (function (_super) {
    __extends(UnboundedOpenRight, _super);
    function UnboundedOpenRight(right, compareFn) {
        return _super.call(this, new bound_1.Bound.Unbounded(), new bound_1.Bound.Open(right), compareFn) || this;
    }
    return UnboundedOpenRight;
}(interval_1.IntervalHasValue));
exports.UnboundedOpenRight = UnboundedOpenRight;
var UnboundedClosedLeft = /** @class */ (function (_super) {
    __extends(UnboundedClosedLeft, _super);
    function UnboundedClosedLeft(left, compareFn) {
        return _super.call(this, new bound_1.Bound.Closed(left), new bound_1.Bound.Unbounded(), compareFn) || this;
    }
    return UnboundedClosedLeft;
}(interval_1.IntervalHasValue));
exports.UnboundedClosedLeft = UnboundedClosedLeft;
var UnboundedOpenLeft = /** @class */ (function (_super) {
    __extends(UnboundedOpenLeft, _super);
    function UnboundedOpenLeft(left, compareFn) {
        return _super.call(this, new bound_1.Bound.Open(left), new bound_1.Bound.Unbounded(), compareFn) || this;
    }
    return UnboundedOpenLeft;
}(interval_1.IntervalHasValue));
exports.UnboundedOpenLeft = UnboundedOpenLeft;
var Singleton = /** @class */ (function (_super) {
    __extends(Singleton, _super);
    function Singleton(point, compareFn) {
        return _super.call(this, new bound_1.Bound.Closed(point), new bound_1.Bound.Closed(point), compareFn) || this;
    }
    return Singleton;
}(interval_1.IntervalHasValue));
exports.Singleton = Singleton;
var Unbounded = /** @class */ (function (_super) {
    __extends(Unbounded, _super);
    function Unbounded() {
        return _super.call(this, new bound_1.Bound.Unbounded(), new bound_1.Bound.Unbounded()) || this;
    }
    return Unbounded;
}(interval_1.Interval));
exports.Unbounded = Unbounded;
var Empty = /** @class */ (function (_super) {
    __extends(Empty, _super);
    function Empty() {
        return _super.call(this, new bound_1.Bound.None(), new bound_1.Bound.None()) || this;
    }
    return Empty;
}(interval_1.Interval));
exports.Empty = Empty;
