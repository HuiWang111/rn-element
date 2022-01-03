import React, { FC, PropsWithChildren } from 'react'
import { IRadioGroupProps } from './interface'
import { BaseGroup } from '../base'

export const RadioGroup: FC<PropsWithChildren<IRadioGroupProps>> = ({
    defaultValue,
    value,
    children,
    onChange,
    ...rest
}: PropsWithChildren<IRadioGroupProps>) => {
    return (
        <BaseGroup
            defaultValue={defaultValue ? [defaultValue] : undefined}
            value={value ? [value] : undefined}
            onChange={(value) => onChange?.(value[0])}
            { ...rest }
        >
            { children }
        </BaseGroup>
    )
}

RadioGroup.displayName = 'RadioGroup'
