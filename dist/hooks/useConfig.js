import { useContext } from 'react';
import { ConfigContext } from '../components/config-provider';
export const useConfig = () => {
    return useContext(ConfigContext);
};
