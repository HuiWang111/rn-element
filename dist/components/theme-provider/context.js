import { createContext } from 'react';
import { colors } from '../../utils';
export const ThemeContext = createContext(Object.assign({}, colors));
