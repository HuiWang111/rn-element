import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { IInternalListItemProps, IListItemProps } from './interface';

const InternalListItem: FC<PropsWithChildren<IInternalListItemProps>> = ({
    isActive,
    activeStyle,
    style,
    children
}: PropsWithChildren<IInternalListItemProps>): JSX.Element => {
    return (
        <View style={[style, isActive ? activeStyle : null]}>
            { children }
        </View>
    );
}

export const ListItem: FC<PropsWithChildren<IListItemProps>> = ({
    children,
    ...props
}: PropsWithChildren<IListItemProps>): JSX.Element => {
    return (
        <InternalListItem
            {...props}
            isActivable={false}
        >
            { children }
        </InternalListItem>
    );
}

ListItem.displayName = 'ListItem';

export const ActivableListItem: FC<PropsWithChildren<IListItemProps>> = ({
    children,
    ...props
}: PropsWithChildren<IListItemProps>): JSX.Element => {
    return (
        <InternalListItem
            {...props}
            isActivable={true}
        >
            { children }
        </InternalListItem>
    );
}

ActivableListItem.displayName = 'ActivableListItem';
