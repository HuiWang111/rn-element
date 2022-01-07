import React, { FC, PropsWithChildren } from 'react'
import { ThemeContext } from './context'
import { ThemeProps } from './interface'
import { colors } from '../../utils'

export const ThemeProvider: FC<PropsWithChildren<ThemeProps>> = ({
    children,
    ...propsColors
}: PropsWithChildren<ThemeProps>) => {
    return (
        <ThemeContext.Provider value={{ ...colors, ...propsColors }}>
            { children }
        </ThemeContext.Provider>
    )
}

ThemeProvider.displayName = 'ThemeProvider'
