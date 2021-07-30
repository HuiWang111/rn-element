import React, { FC, PropsWithChildren, useEffect, createRef } from 'react';
import { TextInput, View } from 'react-native';
import { IInternalListItemProps, IListItemProps } from './interface';
import { mapChildrenWithRef } from './utils';

const InternalListItem: FC<PropsWithChildren<IInternalListItemProps>> = ({
    isActive,
    activeStyle,
    style,
    children,
    autoFocus = false,
    InputComponent
}: PropsWithChildren<IInternalListItemProps>): JSX.Element => {
    const inputRef = createRef<TextInput>();

    useEffect(() => {
        if (autoFocus) {
            if (isActive) {
                inputRef.current?.focus();
            } else {
                inputRef.current?.blur();
            }
        }
    }, [autoFocus, isActive, inputRef]);

    return (
        <View style={[style, isActive ? activeStyle : null]}>
            {
                autoFocus
                    ? mapChildrenWithRef(children, inputRef, InputComponent as FC)
                    : children
            }
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
