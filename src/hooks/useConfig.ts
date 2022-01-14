import { useContext } from 'react'
import { ConfigContext, IConfigProps } from '../components/config-provider'

export const useConfig = () => {
    return useContext(ConfigContext) as Required<IConfigProps>
}
