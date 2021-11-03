import React, { FC, PropsWithChildren } from 'react';
import { ThemeContext } from './context';
import { IThemeProps } from './interface';

export const ThemeProvider: FC<PropsWithChildren<IThemeProps>> = ({
    children,
    ...colors
}: PropsWithChildren<IThemeProps>) => {
    return (
        <ThemeContext.Provider value={{ ...colors }}>
            { children }
        </ThemeContext.Provider>
    );
}
