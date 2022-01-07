import { createContext } from 'react'
import { ThemeProps } from './interface'
import { colors } from '../../utils'

export const ThemeContext = createContext<ThemeProps>({
    ...colors
})
