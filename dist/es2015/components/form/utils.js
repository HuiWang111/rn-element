var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getType, isNil, isInteger, isFloat } from '../../utils';
export function validateField(value, form, name, rules) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!rules || !rules.length) {
            return [false, ''];
        }
        for (const rule of rules) {
            const ruleConfig = typeof rule === 'function'
                ? rule(form)
                : rule;
            const { type, enum: enumerate, len, max, message, min, pattern, required, transform, validator, whitespace } = ruleConfig;
            if (transform) {
                value = transform(value);
            }
            const valueType = getType(value);
            if (type) {
                if (type === 'string') {
                    const valueLength = value === null || value === void 0 ? void 0 : value.length;
                    if (required && !value) {
                        return [true, message || `field ${name} is required`];
                    }
                    else if (valueType !== 'string') {
                        return [true, message || genError(valueType, type, name, 'type')];
                    }
                    else if (required && whitespace && value.trim() === '') {
                        return [true, message || `field ${name} is required`];
                    }
                    else if (!isNil(len) && valueLength !== len) {
                        return [true, message || genError(valueLength, len, name, 'length')];
                    }
                    else if (!isNil(max) && valueLength > max) {
                        return [true, message || genError(valueLength, max, name, 'maxlength')];
                    }
                    else if (!isNil(min) && valueLength < min) {
                        return [true, message || genError(valueLength, min, name, 'minlength')];
                    }
                    else if (pattern && !pattern.test(value)) {
                        return [true, message || `field ${name} is not match pattern`];
                    }
                    return [false, ''];
                }
                else if (['number', 'integer', 'float'].includes(type)) {
                    if (required && isNil(value)) {
                        return [true, message || `field ${name} is required`];
                    }
                    else if (valueType !== 'number') {
                        return [true, message || genError(valueType, type, name, 'type')];
                    }
                    else if (!isNil(max) && value > max) {
                        return [true, message || genError(value, max, name, 'maxValue')];
                    }
                    else if (!isNil(min) && value < min) {
                        return [true, message || genError(value, min, name, 'minValue')];
                    }
                    else if (type === 'integer' && !isInteger(value)) {
                        return [true, message || genError(getType(value, true), type, name, 'type')];
                    }
                    else if (type === 'float' && !isFloat(value)) {
                        return [true, message || genError(getType(value, true), type, name, 'type')];
                    }
                    return [false, ''];
                }
                else if (type === 'boolean') {
                    if (required && isNil(value)) {
                        return [true, message || `field ${name} is required`];
                    }
                    else if (valueType !== 'boolean') {
                        return [true, message || genError(valueType, type, name, 'type')];
                    }
                    return [false, ''];
                }
                else if (type === 'array') {
                    const valueLength = value === null || value === void 0 ? void 0 : value.length;
                    if (required && isNil(value)) {
                        return [true, message || `field ${name} is required`];
                    }
                    else if (valueType !== 'array') {
                        return [true, message || genError(valueType, type, name, 'type')];
                    }
                    else if (!isNil(len) && valueLength !== len) {
                        return [true, message || genError(valueLength, len, name, 'length')];
                    }
                    else if (!isNil(max) && valueLength > max) {
                        return [true, message || genError(valueLength, max, name, 'maxlength')];
                    }
                    else if (!isNil(min) && valueLength < min) {
                        return [true, message || genError(valueLength, min, name, 'minlength')];
                    }
                    return [false, ''];
                }
                else if (type === 'enum') {
                    if (required && isNil(value)) {
                        return [true, message || `field ${name} is required`];
                    }
                    else if (enumerate && !enumerate.includes(value)) {
                        return [true, message || `field ${name} should includes by ${JSON.stringify(enumerate)}`];
                    }
                    return [false, ''];
                }
                return [false, ''];
            }
            if (validator) {
                try {
                    yield validator(ruleConfig, value);
                    return [false, ''];
                }
                catch (msg) {
                    return [true, msg];
                }
            }
            return [false, ''];
        }
        return [false, ''];
    });
}
export function genError(current, target, fieldName, validType) {
    return `field ${fieldName} expect ${validType} ${target}, received ${current}`;
}
