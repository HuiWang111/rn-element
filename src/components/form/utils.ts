import { ValueType, Rule, FormInstance } from './interface'
import { getType, isNil, isInteger, isFloat } from '../../utils'

export async function validateField(
    value: ValueType,
    form: FormInstance,
    name: string,
    rules?: Rule[]
): Promise<[boolean, string]> {
    if (!rules || !rules.length) {
        return [false, '']
    }

    for (const rule of rules) {
        const ruleConfig = typeof rule === 'function'
            ? rule(form)
            : rule

        const {
            type,
            enum: enumerate,
            len,
            max,
            message,
            min,
            pattern,
            required,
            transform,
            validator,
            whitespace
        } = ruleConfig

        if (transform) {
            value = transform(value)
        }

        const valueType = getType(value)
        if (type) {
            if (type === 'string') {
                const valueLength = value?.length

                if (required && !value) {
                    return [true, message || `field ${name} is required`]
                } else if (valueType !== 'string') {
                    return [true, message || genError(valueType, type, name, 'type')]
                } else if (required && whitespace && value.trim() === '') {
                    return [true, message || `field ${name} is required`]
                } else if (!isNil(len) && valueLength !== len) {
                    return [true, message || genError(valueLength, len, name, 'length')]
                } else if (!isNil(max) && valueLength > max) {
                    return [true, message || genError(valueLength, max, name, 'maxlength')]
                } else if (!isNil(min) && valueLength < min) {
                    return [true, message || genError(valueLength, min, name, 'minlength')]
                } else if (pattern && !pattern.test(value)) {
                    return [true, message || `field ${name} is not match pattern`]
                }
            } else if (['number', 'integer', 'float'].includes(type)) {
                if (required && isNil(value)) {
                    return [true, message || `field ${name} is required`]
                } else if (valueType !== 'number') {
                    return [true, message || genError(valueType, type, name, 'type')]
                } else if (!isNil(max) && value > max) {
                    return [true, message || genError(value, max, name, 'maxValue')]
                } else if (!isNil(min) && value < min) {
                    return [true, message || genError(value, min, name, 'minValue')]
                } else if (type === 'integer' && !isInteger(value)) {
                    return [true, message || genError(getType(value, true), type, name, 'type')]
                } else if (type === 'float' && !isFloat(value)) {
                    return [true, message || genError(getType(value, true), type, name, 'type')]
                }
            } else if (type === 'boolean') {
                if (required && isNil(value)) {
                    return [true, message || `field ${name} is required`]
                } else if (valueType !== 'boolean') {
                    return [true, message || genError(valueType, type, name, 'type')]
                }
            } else if (type === 'array') {
                const valueLength = value?.length

                if (required && isNil(value)) {
                    return [true, message || `field ${name} is required`]
                } else if (valueType !== 'array') {
                    return [true, message || genError(valueType, type, name, 'type')]
                } else if (!isNil(len) && valueLength !== len) {
                    return [true, message || genError(valueLength, len, name, 'length')]
                } else if (!isNil(max) && valueLength > max) {
                    return [true, message || genError(valueLength, max, name, 'maxlength')]
                } else if (!isNil(min) && valueLength < min) {
                    return [true, message || genError(valueLength, min, name, 'minlength')]
                }
            } else if (type === 'enum') {
                if (required && isNil(value)) {
                    return [true, message || `field ${name} is required`]
                } else if (enumerate && !enumerate.includes(value)) {
                    return [true, message || `field ${name} should includes by ${JSON.stringify(enumerate)}`]
                }
            }
        } else if (required && !value) {
            return [true, message || `field ${name} is required`]
        } else if (required && whitespace && value.trim && value.trim() === '') {
            return [true, message || `field ${name} is required`]
        }

        if (validator) {
            try {
                await validator(ruleConfig, value)
            } catch(msg) {
                return [true, msg]
            }
        }
    }

    return [false, '']
}

export function genError(
    current: string | number,
    target: string | number,
    fieldName: string,
    validType: string
): string {
    return `field ${fieldName} expect ${validType} ${target}, received ${current}`
}
