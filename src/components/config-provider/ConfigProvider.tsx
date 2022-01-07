import React, { FC, PropsWithChildren } from 'react'
import { ConfigContext } from './context'
import { IConfigProps } from './interface'

export const ConfigProvider: FC<PropsWithChildren<IConfigProps>> = ({
    children,
    ...restProps
}: PropsWithChildren<IConfigProps>) => {
    return (
        <ConfigContext.Provider value={{ ...restProps }}>
            { children }
        </ConfigContext.Provider>
    )
}

ConfigProvider.displayName = 'ConfigProvider'
