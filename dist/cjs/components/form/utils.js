"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genError = exports.validateField = void 0;
var utils_1 = require("../../utils");
function validateField(value, form, name, rules) {
    return __awaiter(this, void 0, void 0, function () {
        var rules_1, rules_1_1, rule, ruleConfig, type, enumerate, len, max, message, min, pattern, required, transform, validator, whitespace, valueType, valueLength, valueLength, msg_1, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!rules || !rules.length) {
                        return [2, [false, '']];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, 10, 11]);
                    rules_1 = __values(rules), rules_1_1 = rules_1.next();
                    _b.label = 2;
                case 2:
                    if (!!rules_1_1.done) return [3, 8];
                    rule = rules_1_1.value;
                    ruleConfig = typeof rule === 'function'
                        ? rule(form)
                        : rule;
                    type = ruleConfig.type, enumerate = ruleConfig.enum, len = ruleConfig.len, max = ruleConfig.max, message = ruleConfig.message, min = ruleConfig.min, pattern = ruleConfig.pattern, required = ruleConfig.required, transform = ruleConfig.transform, validator = ruleConfig.validator, whitespace = ruleConfig.whitespace;
                    if (transform) {
                        value = transform(value);
                    }
                    valueType = utils_1.getType(value);
                    if (type) {
                        if (type === 'string') {
                            valueLength = value === null || value === void 0 ? void 0 : value.length;
                            if (required && !value) {
                                return [2, [true, message || "field " + name + " is required"]];
                            }
                            else if (valueType !== 'string') {
                                return [2, [true, message || genError(valueType, type, name, 'type')]];
                            }
                            else if (required && whitespace && value.trim() === '') {
                                return [2, [true, message || "field " + name + " is required"]];
                            }
                            else if (!utils_1.isNil(len) && valueLength !== len) {
                                return [2, [true, message || genError(valueLength, len, name, 'length')]];
                            }
                            else if (!utils_1.isNil(max) && valueLength > max) {
                                return [2, [true, message || genError(valueLength, max, name, 'maxlength')]];
                            }
                            else if (!utils_1.isNil(min) && valueLength < min) {
                                return [2, [true, message || genError(valueLength, min, name, 'minlength')]];
                            }
                            else if (pattern && !pattern.test(value)) {
                                return [2, [true, message || "field " + name + " is not match pattern"]];
                            }
                            return [2, [false, '']];
                        }
                        else if (['number', 'integer', 'float'].includes(type)) {
                            if (required && utils_1.isNil(value)) {
                                return [2, [true, message || "field " + name + " is required"]];
                            }
                            else if (valueType !== 'number') {
                                return [2, [true, message || genError(valueType, type, name, 'type')]];
                            }
                            else if (!utils_1.isNil(max) && value > max) {
                                return [2, [true, message || genError(value, max, name, 'maxValue')]];
                            }
                            else if (!utils_1.isNil(min) && value < min) {
                                return [2, [true, message || genError(value, min, name, 'minValue')]];
                            }
                            else if (type === 'integer' && !utils_1.isInteger(value)) {
                                return [2, [true, message || genError(utils_1.getType(value, true), type, name, 'type')]];
                            }
                            else if (type === 'float' && !utils_1.isFloat(value)) {
                                return [2, [true, message || genError(utils_1.getType(value, true), type, name, 'type')]];
                            }
                            return [2, [false, '']];
                        }
                        else if (type === 'boolean') {
                            if (required && utils_1.isNil(value)) {
                                return [2, [true, message || "field " + name + " is required"]];
                            }
                            else if (valueType !== 'boolean') {
                                return [2, [true, message || genError(valueType, type, name, 'type')]];
                            }
                            return [2, [false, '']];
                        }
                        else if (type === 'array') {
                            valueLength = value === null || value === void 0 ? void 0 : value.length;
                            if (required && utils_1.isNil(value)) {
                                return [2, [true, message || "field " + name + " is required"]];
                            }
                            else if (valueType !== 'array') {
                                return [2, [true, message || genError(valueType, type, name, 'type')]];
                            }
                            else if (!utils_1.isNil(len) && valueLength !== len) {
                                return [2, [true, message || genError(valueLength, len, name, 'length')]];
                            }
                            else if (!utils_1.isNil(max) && valueLength > max) {
                                return [2, [true, message || genError(valueLength, max, name, 'maxlength')]];
                            }
                            else if (!utils_1.isNil(min) && valueLength < min) {
                                return [2, [true, message || genError(valueLength, min, name, 'minlength')]];
                            }
                            return [2, [false, '']];
                        }
                        else if (type === 'enum') {
                            if (required && utils_1.isNil(value)) {
                                return [2, [true, message || "field " + name + " is required"]];
                            }
                            else if (enumerate && !enumerate.includes(value)) {
                                return [2, [true, message || "field " + name + " should includes by " + JSON.stringify(enumerate)]];
                            }
                            return [2, [false, '']];
                        }
                        return [2, [false, '']];
                    }
                    if (!validator) return [3, 6];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4, validator(ruleConfig, value)];
                case 4:
                    _b.sent();
                    return [2, [false, '']];
                case 5:
                    msg_1 = _b.sent();
                    return [2, [true, msg_1]];
                case 6: return [2, [false, '']];
                case 7:
                    rules_1_1 = rules_1.next();
                    return [3, 2];
                case 8: return [3, 11];
                case 9:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 11];
                case 10:
                    try {
                        if (rules_1_1 && !rules_1_1.done && (_a = rules_1.return)) _a.call(rules_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 11: return [2, [false, '']];
            }
        });
    });
}
exports.validateField = validateField;
function genError(current, target, fieldName, validType) {
    return "field " + fieldName + " expect " + validType + " " + target + ", received " + current;
}
exports.genError = genError;
