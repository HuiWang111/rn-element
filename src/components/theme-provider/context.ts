import { createContext } from 'react';
import { IThemeProps } from './interface';
import { colors } from '../../utils';

export const ThemeContext = createContext<IThemeProps>({
    ...colors
});
