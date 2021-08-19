import { createContext } from 'react';
import { IConfigProps } from './interface';

export const ConfigContext = createContext<IConfigProps>({
    showSoftInputOnFocus: true // for List Component
});
