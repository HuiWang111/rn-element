import { useContext } from 'react';
import { ThemeContext } from '../components/theme-provider';
export const useTheme = () => {
    return useContext(ThemeContext);
};
