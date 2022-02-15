/*
 * @Autor: hui.wang
 * @Date: 2021-08-13 20:31:55
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-15 21:41:02
 * @emial: hui.wang@bizfocus.cn
 */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { DeviceEventEmitter, EmitterSubscription } from 'react-native'
import { KeyCode } from '../constants'
import { Loading } from '../components/loading'

interface IEventType {
    which: number;
}

type EventListener = (event: IEventType) => void;

const KeyUpEventName = 'keyup'
const createListener: (listener: EventListener) => EventListener = (listener) => (e) => {
    /**
     * @description: 当前存在Loading的情况下，阻止键盘事件，防止重复提交。
     */
    if (Loading.isLoading()) {
        return
    }

    listener(e)
}
const createListenerWithKeyCode: (callback: () => void, targetKeyCode: number) => EventListener = (callback, targetKeyCode) => (e) => {
    /**
     * @description: 当前存在Loading的情况下，阻止键盘事件，防止重复提交。
     */
    if (Loading.isLoading() || targetKeyCode !== e.which) {
        return
    }

    callback()
}

export function useKeyUp(listener: EventListener, deps: any[] = []): void {
    useEffect(() => {
        let subscription: EmitterSubscription | undefined
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, createListener(listener))
        }
        const willUnmount = () => {
            subscription?.remove()
        }

        didMount()

        return willUnmount
    }, [listener, ...deps])
}

export function useEnter(callback: () => void, deps: any[] = []): void {
    useEffect(() => {
        let subscription: EmitterSubscription | undefined

        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, createListenerWithKeyCode(callback, KeyCode.Enter))
        }
        const willUnmount = () => {
            subscription?.remove()
        }

        didMount()

        return willUnmount
    }, [callback, ...deps])
}

export function useArrowUp(callback: () => void, deps: any[] = []): void {
    useEffect(() => {
        let subscription: EmitterSubscription | undefined

        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, createListenerWithKeyCode(callback, KeyCode.Up))
        }
        const willUnmount = () => {
            subscription?.remove()
        }

        didMount()

        return willUnmount
    }, [callback, ...deps])
}

export function useArrowDown(callback: () => void, deps: any[] = []): void {
    let subscription: EmitterSubscription | undefined
    useEffect(() => {
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, createListenerWithKeyCode(callback, KeyCode.Down))
        }
        const willUnmount = () => {
            subscription?.remove()
        }

        didMount()

        return willUnmount
    }, [callback, ...deps])
}

export function useArrowLeft(callback: () => void, deps: any[] = []): void {
    let subscription: EmitterSubscription | undefined
    useEffect(() => {
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, createListenerWithKeyCode(callback, KeyCode.Left))
        }
        const willUnmount = () => {
            subscription?.remove()
        }

        didMount()

        return willUnmount
    }, [callback, ...deps])
}

export function useArrowRight(callback: () => void, deps: any[] = []): void {
    let subscription: EmitterSubscription | undefined
    useEffect(() => {
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, createListenerWithKeyCode(callback, KeyCode.Right))
        }
        const willUnmount = () => {
            subscription?.remove()
        }

        didMount()

        return willUnmount
    }, [callback, ...deps])
}
