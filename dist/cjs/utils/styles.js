"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleUtils = void 0;
var react_native_1 = require("react-native");
function createPercentStyleUtils() {
    var spans = 24;
    var percentStyleUtils = {};
    var widthPrefix = 'span-';
    var marginPrefix = 'offset-';
    var percentBase = 100 / spans;
    for (var i = 1; i <= spans; i++) {
        percentStyleUtils[widthPrefix + i] = {
            width: percentBase * i + '%'
        };
        percentStyleUtils[marginPrefix + i] = {
            marginLeft: percentBase * i + '%'
        };
    }
    return percentStyleUtils;
}
exports.styleUtils = react_native_1.StyleSheet.create(__assign({}, createPercentStyleUtils()));
