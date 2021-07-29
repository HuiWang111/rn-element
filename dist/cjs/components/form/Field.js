"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var contexts_1 = require("./contexts");
var contexts_2 = require("./contexts");
var utils_1 = require("./utils");
var utils_2 = require("../../utils");
var Field = (function (_super) {
    __extends(Field, _super);
    function Field() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.init = false;
        _this.state = {
            message: ''
        };
        _this.setMessage = function (message) {
            _this.setState({
                message: message
            });
        };
        _this.reRender = function () {
            _this.forceUpdate();
        };
        _this.validateRules = function (value) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, rules, _b, setFieldError, removeFieldError, getFieldError, _c, hasError, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.props, name = _a.name, rules = _a.rules;
                        _b = this.context.getInternalHooks(contexts_2.HOOK_MARK), setFieldError = _b.setFieldError, removeFieldError = _b.removeFieldError;
                        getFieldError = this.context.getFieldError;
                        return [4, utils_1.validateField(value, this.context, name, rules)];
                    case 1:
                        _c = __read.apply(void 0, [_d.sent(), 2]), hasError = _c[0], message = _c[1];
                        if (hasError) {
                            this.setMessage(message);
                            setFieldError(name, message);
                        }
                        else if (getFieldError(name)) {
                            this.setMessage('');
                            removeFieldError(name);
                        }
                        return [2];
                }
            });
        }); };
        _this.getControlled = function (childProps) {
            var _a;
            var _b = _this.props, name = _b.name, valuePropName = _b.valuePropName, changeMethodName = _b.changeMethodName, validateTrigger = _b.validateTrigger;
            var _c = _this.context, getFieldValue = _c.getFieldValue, setFieldValue = _c.setFieldValue;
            return __assign(__assign({}, childProps), (_a = {}, _a[valuePropName] = getFieldValue(name), _a[changeMethodName] = function (value) {
                setFieldValue(name, value);
                if (validateTrigger === 'onChange') {
                    _this.validateRules(value);
                }
            }, _a.onBlur = function (e) {
                var _a;
                if (validateTrigger === 'onBlur') {
                    _this.validateRules((_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.text);
                }
            }, _a));
        };
        return _this;
    }
    Field.prototype.componentDidMount = function () {
        if (!this.init) {
            var _a = this.props, name_1 = _a.name, initialValue = _a.initialValue;
            var _b = this.context.getInternalHooks(contexts_2.HOOK_MARK), registerField = _b.registerField, setInitialValue = _b.setInitialValue;
            this.init = true;
            registerField(this);
            setInitialValue(name_1, initialValue);
        }
    };
    Field.prototype.render = function () {
        var _this = this;
        var children = this.props.children;
        if (!children) {
            return null;
        }
        var col = this.props.col;
        var message = this.state.message;
        var fieldStyle = [styles.field];
        if (col) {
            if (col.span) {
                fieldStyle = fieldStyle.concat(utils_2.styleUtils["span-" + col.span]);
            }
            if (col.offset) {
                fieldStyle = fieldStyle.concat(utils_2.styleUtils["offset-" + col.offset]);
            }
        }
        return (react_1.default.createElement(react_native_1.View, { style: fieldStyle },
            react_1.Children.map(children, function (c) {
                return react_1.cloneElement(c, _this.getControlled(c.props));
            }),
            message ? (react_1.default.createElement(react_native_1.View, { style: [styles.formItemError] },
                react_1.default.createElement(react_native_1.Text, { style: [styles.formItemErrorMsg] }, message))) : null));
    };
    Field.contextType = contexts_1.FormContext;
    return Field;
}(react_1.Component));
exports.Field = Field;
var styles = react_native_1.StyleSheet.create({
    field: {},
    formItemError: {
        minHeight: 24
    },
    formItemErrorMsg: {
        color: utils_2.colors.error,
        fontSize: 14
    }
});
