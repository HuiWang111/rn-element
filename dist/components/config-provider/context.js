import { createContext } from 'react';
export const ConfigContext = createContext({
    showSoftInputOnFocus: true,
    loadingZIndex: 99,
    modalZIndex: 10
});
