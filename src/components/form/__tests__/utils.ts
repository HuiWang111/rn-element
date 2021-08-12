import { validateField, genError } from '../utils';
import { FormStore } from '../useForm';
 
describe('test form Utils', () => {
    let form;

    beforeAll(() => {
        form = new FormStore();
    });

    it('validateField should work', async () => {
        expect(await validateField(
            undefined,
            form,
            'name'
        )).toEqual([false, '']);
        
        // test string
        expect(await validateField(
            'haha',
            form,
            'name',
            [{ type: 'string', required: true }]
        )).toEqual([false, '']);
        expect(await validateField(
            undefined,
            form,
            'name',
            [{ type: 'string', required: true }]
        )).toEqual([true, 'field name is required']);

        expect(await validateField(
            2,
            form,
            'name',
            [{ type: 'string' }]
        )).toEqual([true, genError('number', 'string', 'name', 'type')]);
        
        expect(await validateField(
            'haha ',
            form,
            'name',
            [{ type: 'string', required: true, whitespace: true }]
        )).toEqual([false, '']);
        expect(await validateField(
            '   ',
            form,
            'name',
            [{ type: 'string', required: true, whitespace: true }]
        )).toEqual([true, 'field name is required']);
        
        expect(await validateField(
            'hahahahaha',
            form,
            'name',
            [{ type: 'string', len: 10 }]
        )).toEqual([false, '']);
        expect(await validateField(
            'hahaha',
            form,
            'name',
            [{ type: 'string', len: 10 }]
        )).toEqual([true, genError('hahaha'.length, 10, 'name', 'length')]);

        expect(await validateField(
            'hahaha',
            form,
            'name',
            [{ type: 'string', max: 10 }]
        )).toEqual([false, '']);
        expect(await validateField(
            'hahahahahaha',
            form,
            'name',
            [{ type: 'string', max: 10 }]
        )).toEqual([true, genError('hahahahahaha'.length, 10, 'name', 'maxlength')]);

        expect(await validateField(
            'hahahahahaha',
            form,
            'name',
            [{ type: 'string', min: 10 }]
        )).toEqual([false, '']);
        expect(await validateField(
            'hahaha',
            form,
            'name',
            [{ type: 'string', min: 10 }]
        )).toEqual([true, genError('hahaha'.length, 10, 'name', 'minlength')]);

        expect(await validateField(
            '123',
            form,
            'name',
            [{ type: 'string', pattern: /\d+/g }]
        )).toEqual([false, '']);
        expect(await validateField(
            'abc',
            form,
            'name',
            [{ type: 'string', pattern: /\d+/g }]
        )).toEqual([true, 'field name is not match pattern']);

        // test number
        expect(await validateField(
            0,
            form,
            'age',
            [{ type: 'number', required: true }]
        )).toEqual([false, '']);
        expect(await validateField(
            undefined,
            form,
            'age',
            [{ type: 'number', required: true }]
        )).toEqual([true, 'field age is required']);

        expect(await validateField(
            5,
            form,
            'age',
            [{ type: 'number' }]
        )).toEqual([false, '']);
        expect(await validateField(
            '',
            form,
            'age',
            [{ type: 'number', required: true }]
        )).toEqual([true, genError('string', 'number', 'age', 'type')]);

        expect(await validateField(
            5,
            form,
            'age',
            [{ type: 'number', max: 10 }]
        )).toEqual([false, '']);
        expect(await validateField(
            55,
            form,
            'age',
            [{ type: 'number', max: 10 }]
        )).toEqual([true, genError(55, 10, 'age', 'maxValue')]);

        expect(await validateField(
            55,
            form,
            'age',
            [{ type: 'number', min: 10 }]
        )).toEqual([false, '']);
        expect(await validateField(
            5,
            form,
            'age',
            [{ type: 'number', min: 10 }]
        )).toEqual([true, genError(5, 10, 'age', 'minValue')]);

        // test integer
        expect(await validateField(
            0,
            form,
            'age',
            [{ type: 'integer', required: true }]
        )).toEqual([false, '']);
        expect(await validateField(
            undefined,
            form,
            'age',
            [{ type: 'integer', required: true }]
        )).toEqual([true, 'field age is required']);

        expect(await validateField(
            5,
            form,
            'age',
            [{ type: 'integer' }]
        )).toEqual([false, '']);
        expect(await validateField(
            '',
            form,
            'age',
            [{ type: 'integer', required: true }]
        )).toEqual([true, genError('string', 'integer', 'age', 'type')]);

        expect(await validateField(
            5,
            form,
            'age',
            [{ type: 'integer', max: 10 }]
        )).toEqual([false, '']);
        expect(await validateField(
            55,
            form,
            'age',
            [{ type: 'integer', max: 10 }]
        )).toEqual([true, genError(55, 10, 'age', 'maxValue')]);

        expect(await validateField(
            55,
            form,
            'age',
            [{ type: 'integer', min: 10 }]
        )).toEqual([false, '']);
        expect(await validateField(
            5,
            form,
            'age',
            [{ type: 'integer', min: 10 }]
        )).toEqual([true, genError(5, 10, 'age', 'minValue')]);
        
        expect(await validateField(
            5.5,
            form,
            'age',
            [{ type: 'integer' }]
        )).toEqual([true, genError('float', 'integer', 'age', 'type')]);

        // test float
        expect(await validateField(
            0.1,
            form,
            'age',
            [{ type: 'float', required: true }]
        )).toEqual([false, '']);
        expect(await validateField(
            0,
            form,
            'age',
            [{ type: 'float', required: true }]
        )).toEqual([true, genError('integer', 'float', 'age', 'type')]);

        // test boolean
        expect(await validateField(
            false,
            form,
            'isShow',
            [{ type: 'boolean', required: true }]
        )).toEqual([false, '']);
        expect(await validateField(
            undefined,
            form,
            'isShow',
            [{ type: 'boolean', required: true }]
        )).toEqual([true, 'field isShow is required']);
        expect(await validateField(
            50,
            form,
            'isShow',
            [{ type: 'boolean' }]
        )).toEqual([true, genError('number', 'boolean', 'isShow', 'type')]);

        // test array
        expect(await validateField(
            [],
            form,
            'list',
            [{ type: 'array', required: true }]
        )).toEqual([false, '']);
        expect(await validateField(
            undefined,
            form,
            'list',
            [{ type: 'array', required: true }]
        )).toEqual([true, 'field list is required']);
        expect(await validateField(
            '',
            form,
            'list',
            [{ type: 'array', required: true }]
        )).toEqual([true, genError('string', 'array', 'list', 'type')]);

        expect(await validateField(
            [],
            form,
            'list',
            [{ type: 'array', max: 3 }]
        )).toEqual([false, '']);
        expect(await validateField(
            [1, 2, 3, 4],
            form,
            'list',
            [{ type: 'array', max: 3 }]
        )).toEqual([true, genError(4, 3, 'list', 'maxlength')]);

        expect(await validateField(
            [1, 2, 3],
            form,
            'list',
            [{ type: 'array', min: 3 }]
        )).toEqual([false, '']);
        expect(await validateField(
            [],
            form,
            'list',
            [{ type: 'array', min: 3 }]
        )).toEqual([true, genError(0, 3, 'list', 'minlength')]);

        // test enum
        expect(await validateField(
            5,
            form,
            'unknow',
            [{ type: 'enum', required: true }]
        )).toEqual([false, '']);
        expect(await validateField(
            undefined,
            form,
            'unknow',
            [{ type: 'enum', required: true }]
        )).toEqual([true, 'field unknow is required']);

        expect(await validateField(
            5,
            form,
            'unknow',
            [{ type: 'enum', enum: [1, 5, 6] }]
        )).toEqual([false, '']);
        expect(await validateField(
            5,
            form,
            'unknow',
            [{ type: 'enum', enum: [1, '5', 6] }]
        )).toEqual([true, `field unknow should includes by ${JSON.stringify([1, '5', 6])}`]);
        expect(await validateField(
            5,
            form,
            'unknow',
            [{ type: 'enum', enum: [1, 2, 3, 4] }]
        )).toEqual([true, `field unknow should includes by [1,2,3,4]`]);

        // test rule not include type
        expect(await validateField(
            '',
            form,
            'age',
            [{ required: true, message: 'required' }]
        )).toEqual([true, 'required']);
        expect(await validateField(
            '1',
            form,
            'age',
            [{ required: true, message: 'required' }]
        )).toEqual([false, '']);
        expect(await validateField(
            ' ',
            form,
            'age',
            [{ required: true, message: 'required' }]
        )).toEqual([false, '']);
        expect(await validateField(
            ' ',
            form,
            'age',
            [{ required: true, message: 'required', whitespace: true }]
        )).toEqual([true, 'required']);

        // test validator
        expect(await validateField(
            5,
            form,
            'age',
            [{ validator: (rule, value) => {
                if (value > 5) {
                    return Promise.reject('年龄不能大于5');
                }
                return Promise.resolve();
            } }]
        )).toEqual([false, '']);
        expect(await validateField(
            6,
            form,
            'age',
            [{ validator: (rule, value) => {
                if (value > 5) {
                    return Promise.reject('年龄不能大于5');
                }
                return Promise.resolve();
            } }]
        )).toEqual([true, '年龄不能大于5']);
    });
});