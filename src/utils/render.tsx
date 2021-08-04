import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { isString } from './validate';

export const renderWithText = (content: string | ReactNode | undefined): ReactNode | null | undefined => {
    return isString(content)
        ? <Text>{ content }</Text>
        : content;
}