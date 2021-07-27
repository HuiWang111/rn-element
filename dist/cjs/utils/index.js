"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = void 0;
var color_1 = require("./color");
var validate_1 = require("./validate");
Object.defineProperty(exports, "isArray", { enumerable: true, get: function () { return validate_1.isArray; } });
Object.defineProperty(exports, "isBoolean", { enumerable: true, get: function () { return validate_1.isBoolean; } });
Object.defineProperty(exports, "isFunction", { enumerable: true, get: function () { return validate_1.isFunction; } });
Object.defineProperty(exports, "isNull", { enumerable: true, get: function () { return validate_1.isNull; } });
Object.defineProperty(exports, "isNumber", { enumerable: true, get: function () { return validate_1.isNumber; } });
Object.defineProperty(exports, "isObject", { enumerable: true, get: function () { return validate_1.isObject; } });
Object.defineProperty(exports, "isPlainObject", { enumerable: true, get: function () { return validate_1.isPlainObject; } });
Object.defineProperty(exports, "isString", { enumerable: true, get: function () { return validate_1.isString; } });
Object.defineProperty(exports, "isUndefined", { enumerable: true, get: function () { return validate_1.isUndefined; } });
Object.defineProperty(exports, "isNil", { enumerable: true, get: function () { return validate_1.isNil; } });
Object.defineProperty(exports, "isInteger", { enumerable: true, get: function () { return validate_1.isInteger; } });
Object.defineProperty(exports, "isFloat", { enumerable: true, get: function () { return validate_1.isFloat; } });
Object.defineProperty(exports, "getType", { enumerable: true, get: function () { return validate_1.getType; } });
var warning_1 = require("./warning");
Object.defineProperty(exports, "warning", { enumerable: true, get: function () { return warning_1.warning; } });
exports.colors = {
    error: color_1.error,
    black: color_1.black
};
var styles_1 = require("./styles");
Object.defineProperty(exports, "styleUtils", { enumerable: true, get: function () { return styles_1.styleUtils; } });
Object.defineProperty(exports, "mergeStyle", { enumerable: true, get: function () { return styles_1.mergeStyle; } });
