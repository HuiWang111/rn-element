/*
 * @Autor: hui.wang
 * @Date: 2021-08-13 20:31:55
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-15 21:25:42
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

export function useKeyUp(listener: EventListener, deps: any[] = []): void {
    useEffect(() => {
        /**
         * @description: 当前存在Loading的情况下，阻止键盘事件，防止重复提交。
         */
        if (Loading.isLoading()) {
            return
        }

        let subscription: EmitterSubscription | undefined
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener)
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
        if (Loading.isLoading()) {
            return
        }

        let subscription: EmitterSubscription | undefined
        const listener = (e: IEventType) => {
            if (e.which === KeyCode.Enter) {
                callback()
            }
        }

        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener)
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
        if (Loading.isLoading()) {
            return
        }

        let subscription: EmitterSubscription | undefined
        const listener = (e: IEventType) => {
            if (e.which === KeyCode.Up) {
                callback()
            }
        }

        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener)
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
        if (Loading.isLoading()) {
            return
        }

        const listener = (e: IEventType) => {
            if (e.which === KeyCode.Down) {
                callback()
            }
        }

        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener)
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
        if (Loading.isLoading()) {
            return
        }

        const listener = (e: IEventType) => {
            if (e.which === KeyCode.Left) {
                callback()
            }
        }

        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener)
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
        if (Loading.isLoading()) {
            return
        }

        const listener = (e: IEventType) => {
            if (e.which === KeyCode.Right) {
                callback()
            }
        }

        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener)
        }
        const willUnmount = () => {
            subscription?.remove()
        }

        didMount()

        return willUnmount
    }, [callback, ...deps])
}
