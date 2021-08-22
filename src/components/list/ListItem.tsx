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
    keyboard,
    onPress,
    onChange,
    onEnter
}: PropsWithChildren<IInternalListItemProps>): JSX.Element => {
    const inputRef = useRef<TextInput | null>(null);
    /**
     * 由于按下Enter键同时会触发默认焦点元素的onPress事件
     * 因此这里做一个标记，避免onEnter时同时触发onPress
     */
    const isTabEnter = useRef(false);
    const { showSoftInputOnFocus } = useContext(ConfigContext);
    
    const handlePress = (e: GestureResponderEvent) => {
        if (!isTabEnter.current) {
            onChange?.(index as number);
            onPress?.(e);
        } else {
            isTabEnter.current = false;
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
            isTabEnter.current = true;

            if (isActive && keyboard) {
                onEnter?.();
            }
        } else {
            isTabEnter.current = false;
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
