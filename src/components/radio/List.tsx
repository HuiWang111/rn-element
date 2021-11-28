import React, { FC } from 'react';
import { IRadioListProps } from './interface';
import { last } from '../../utils';
import { CheckList } from '../checkbox';

export const RadioList: FC<IRadioListProps> = ({
    value,
    onChange,
    ...rest
}: IRadioListProps) => {
    const handleChange = (value: string[]): void => {
        onChange?.(value.length ? last(value) : undefined)
    }

    return (
        <CheckList
            {...rest}
            value={value ? [value] : undefined}
            onChange={handleChange}
        />
    )
}
