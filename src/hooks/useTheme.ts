import { useContext } from 'react'
import { ThemeContext, IThemeProps } from '../components/theme-provider'

export const useTheme = () => {
    return useContext(ThemeContext) as Required<IThemeProps>
}
