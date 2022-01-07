import { useContext } from 'react'
import { ThemeContext, ThemeProps } from '../components/theme-provider'

export const useTheme = () => {
    return useContext(ThemeContext) as Required<ThemeProps>
}
