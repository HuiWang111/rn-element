import React, { FC, ComponentType, PropsWithChildren, useEffect, useRef, useContext } from 'react';
import { TextInput, Pressable, View, GestureResponderEvent } from 'react-native';
import { IInternalListItemProps, IListItemProps } from './interface';
import { mapChildrenWithRef } from './utils';
import { useKeyUp } from '../../hooks';
import { KeyCode } from '../../constants';
import PropTypes from 'prop-types';
import { ConfigContext } from '../config-provider';

const InternalListItem: FC<PropsWithChildren<IInternalListItemProps>> = ({
    isActive,
    activeStyle,
    style,
    children,
    autoFocus,
    inputComponent,
    isActivable,
    index,
    onPress,
    onChange,
    onEnter
}: PropsWithChildren<IInternalListItemProps>): JSX.Element => {
    const inputRef = useRef<TextInput | null>(null);
    const { showSoftInputOnFocus } = useContext(ConfigContext);
    let isTabEnter = false;
    
    const handlePress = (e: GestureResponderEvent) => {
        if (!isTabEnter) {
            onChange?.(index as number);
            onPress?.(e);
        } else {
            isTabEnter = false;
        }
    }

    useEffect(() => {
        if (autoFocus) {
            if (isActive) {
                if (inputRef.current?.isFocused() === false) {
                    inputRef.current.focus();
                }
            } else {
                if (inputRef.current?.isFocused()) {
                    inputRef.current.blur();
                }
            }
        }
    }, [autoFocus, isActive]);

    useKeyUp((e) => {
        if (e.which === KeyCode.Enter) {
            isTabEnter = true;
            
            if (isActive) {
                onEnter?.();
            }
        } else {
            isTabEnter = false;
        }
    }, [isActive]);

    return isActivable ? (
        <Pressable
            style={[style, isActive ? activeStyle : null]}
            onPress={handlePress}
        >
            {
                autoFocus
                    ? mapChildrenWithRef(children, inputRef, inputComponent as ComponentType, {
                        showSoftInputOnFocus: showSoftInputOnFocus as boolean
                    })
                    : children
            }
        </Pressable>
    ) : (
        <View style={style}>
            { children }
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
