import React, { FC, ComponentType, PropsWithChildren, useEffect, createRef } from 'react';
import { TextInput, View } from 'react-native';
import { IInternalListItemProps, IListItemProps } from './interface';
import { mapChildrenWithRef } from './utils';
import { renderWithText } from '../../utils';
import PropTypes from 'prop-types';

const InternalListItem: FC<PropsWithChildren<IInternalListItemProps>> = ({
    isActive,
    activeStyle,
    style,
    children,
    autoFocus,
    inputComponent
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
                    ? mapChildrenWithRef(renderWithText(children), inputRef, inputComponent as ComponentType)
                    : renderWithText(children)
            }
        </View>
    );
}

InternalListItem.propTypes = {
    isActive: PropTypes.bool,
    autoFocus: PropTypes.bool,
    isActivable: PropTypes.bool.isRequired
};

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
