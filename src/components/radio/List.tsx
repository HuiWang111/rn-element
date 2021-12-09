import React, { FC } from 'react';
import { IRadioListProps } from './interface';
import { last } from '../../utils';
import { CheckList } from '../checkbox';

export const RadioList: FC<IRadioListProps> = ({
    value,
    defaultValue,
    onChange,
    ...rest
}: IRadioListProps) => {
    const handleChange = (value: string[]): void => {
        onChange?.(last(value))
    }

    return (
        <CheckList
            {...rest}
            value={value ? [value] : undefined}
            defaultValue={defaultValue ? [defaultValue] : undefined}
            onChange={handleChange}
        />
    )
}
