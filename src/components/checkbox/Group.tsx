import React, { FC, PropsWithChildren } from 'react'
import { ICheckboxGroupProps } from './interface'
import { BaseGroup } from '../base'

export const CheckboxGroup: FC<PropsWithChildren<ICheckboxGroupProps>> = ({
    children,
    ...rest
}: PropsWithChildren<ICheckboxGroupProps>) => {
    return (
        <BaseGroup
            { ...rest }
        >
            { children }
        </BaseGroup>
    )
}
