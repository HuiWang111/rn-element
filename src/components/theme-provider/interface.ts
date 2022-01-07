import { colors } from '../../utils'
import { ColorValue } from 'react-native'

export type ThemeProps = Partial<typeof colors> & {
    page: IThemedPage,
}

export interface IThemedPage {
    headerBackgroundColor?: ColorValue | undefined;
    headerTextColor?: ColorValue | undefined;
    headerTextSize?: number | undefined;
    bottomBackgroundColor?: ColorValue | undefined;
    bottomTextColor?: ColorValue | undefined;
    bottomTextSize?: number | undefined;
}
