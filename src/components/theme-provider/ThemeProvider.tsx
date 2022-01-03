import React, { FC, PropsWithChildren } from 'react';
import { ThemeContext } from './context';
import { IThemeProps } from './interface';
import { colors } from '../../utils'

export const ThemeProvider: FC<PropsWithChildren<IThemeProps>> = ({
    children,
    ...propsColors
}: PropsWithChildren<IThemeProps>) => {
    return (
        <ThemeContext.Provider value={{ ...colors, ...propsColors }}>
            { children }
        </ThemeContext.Provider>
    );
}

ThemeProvider.displayName = 'ThemeProvider'
