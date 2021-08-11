import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import { isString } from './validate';

export const renderWithText = (content: string | ReactNode | undefined, props?: TextProps): ReactNode | null | undefined => {
    return isString(content)
        ? <Text { ...(props || {}) }>{ content }</Text>
        : content;
}