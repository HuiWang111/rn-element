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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
exports.useForm = exports.FormStore = void 0;
var react_1 = require("react");
var contexts_1 = require("./contexts");
var utils_1 = require("../utils");
var FormStore = (function () {
    function FormStore() {
        var _this = this;
        this.getForm = function () {
            return {
                getFieldsValue: _this.getFieldsValue,
                getFieldValue: _this.getFieldValue,
                resetFields: _this.resetFields,
                setFieldsValue: _this.setFieldsValue,
                setFieldValue: _this.setFieldValue,
                validateFields: _this.validateFields,
                getFieldError: _this.getFieldError,
                getFieldsError: _this.getFieldsError,
                getInternalHooks: _this.getInternalHooks
            };
        };
        this.getInternalHooks = function (mark) {
            if (mark === contexts_1.HOOK_MARK) {
                return {
                    registerField: _this.registerField,
                    getForm: _this.getForm,
                    setFieldError: _this.setFieldError,
                    setInitialValue: _this.setInitialValue,
                    removeFieldError: _this.removeFieldError
                };
            }
            utils_1.warning(false, '`getInternalHooks` is internal usage. Should not call directly.');
            return null;
        };
        this.setInitialValue = function (field, initialValue) {
            if (!utils_1.isUndefined(initialValue)) {
                _this.initialValues[field] = initialValue;
                _this.setFieldValue(field, initialValue);
            }
        };
        this.registerField = function (fieldEntity) {
            _this.fieldEntities.push(fieldEntity);
        };
        this.values = {};
        this.initialValues = {};
        this.errors = {};
        this.fieldEntities = [];
        this.getFieldsValue = this.getFieldsValue.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.setFieldsValue = this.setFieldsValue.bind(this);
        this.setFieldValue = this.setFieldValue.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.getFieldError = this.getFieldError.bind(this);
        this.getFieldsError = this.getFieldsError.bind(this);
        this.setFieldError = this.setFieldError.bind(this);
    }
    FormStore.prototype.getFieldsValue = function (fields) {
        var _this = this;
        if (fields == null) {
            return __assign({}, this.values);
        }
        return fields.reduce(function (values, field) {
            values[field] = _this.values[field];
            return values;
        }, {});
    };
    FormStore.prototype.getFieldValue = function (field) {
        if (field == null) {
            return;
        }
        return this.values[field];
    };
    FormStore.prototype.getFieldError = function (field) {
        return this.errors[field];
    };
    FormStore.prototype.getFieldsError = function (fields) {
        var _this = this;
        if (!fields || !fields.length)
            return {};
        return fields.reduce(function (errors, field) {
            var error = _this.errors[field];
            if (error) {
                errors[field] = error;
            }
            return errors;
        }, {});
    };
    FormStore.prototype.resetFields = function (fields) {
        var _this = this;
        if (fields == null) {
            this.values = __assign({}, this.initialValues);
            this.fieldEntities.forEach(function (entity) { return entity.reRender(); });
            return;
        }
        fields.forEach(function (field) {
            _this.values[field] = _this.initialValues[field];
        });
        this.fieldEntities.forEach(function (entity) { return entity.reRender(); });
    };
    FormStore.prototype.setFieldsValue = function (values) {
        if (values == null) {
            return;
        }
        this.values = __assign(__assign({}, this.values), values);
        this.fieldEntities.forEach(function (entity) { return entity.reRender(); });
    };
    FormStore.prototype.setFieldValue = function (field, value) {
        if (field == null) {
            return;
        }
        this.values[field] = value;
        this.fieldEntities.some(function (entity) {
            if (entity.props.name === field) {
                entity.reRender();
                return true;
            }
            return false;
        });
    };
    FormStore.prototype.setFieldError = function (field, message) {
        this.errors[field] = message;
    };
    FormStore.prototype.removeFieldError = function (field) {
        delete this.errors[field];
    };
    FormStore.prototype.validateFields = function (fields) {
        return __awaiter(this, void 0, void 0, function () {
            var fieldEntities, fieldEntities_1, fieldEntities_1_1, entity, name_1, e_1_1;
            var e_1, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (fields) {
                            fieldEntities = this.fieldEntities.filter(function (entity) { return fields.includes(entity.props.name); });
                        }
                        else {
                            fieldEntities = __spread(this.fieldEntities);
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        fieldEntities_1 = __values(fieldEntities), fieldEntities_1_1 = fieldEntities_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!fieldEntities_1_1.done) return [3, 5];
                        entity = fieldEntities_1_1.value;
                        name_1 = entity.props.name;
                        return [4, entity.validateRules(this.values[name_1])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        fieldEntities_1_1 = fieldEntities_1.next();
                        return [3, 2];
                    case 5: return [3, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 8];
                    case 7:
                        try {
                            if (fieldEntities_1_1 && !fieldEntities_1_1.done && (_a = fieldEntities_1.return)) _a.call(fieldEntities_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7];
                    case 8: return [2, new Promise(function (resolve, reject) {
                            var errorKeys = Object.keys(_this.errors);
                            if (errorKeys.length) {
                                reject(__assign({}, _this.errors));
                            }
                            else {
                                resolve(__assign({}, _this.values));
                            }
                        })];
                }
            });
        });
    };
    return FormStore;
}());
exports.FormStore = FormStore;
function useForm() {
    var formRef = react_1.useRef();
    if (!formRef.current) {
        var formStore = new FormStore();
        formRef.current = formStore.getForm();
    }
    return [formRef.current];
}
exports.useForm = useForm;
