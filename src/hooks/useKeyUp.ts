/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { KeyCode } from '../constants';

interface IEventType {
    which: number;
}

type EventListener = (event: IEventType) => void;

const KeyUpEventName = 'keyup';

export function useKeyUp(listener: EventListener, deps: any[] = []): void {
    useEffect(() => {
        const didMount = () => {
            DeviceEventEmitter.addListener(KeyUpEventName, listener);
        }
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(KeyUpEventName, listener);
        }

        didMount();

        return willUnmount;
    }, [listener, ...deps]);
}

export function useEnter(callback: () => void, deps: any[] = []): void {
    useEffect(() => {
        const listener = (e: IEventType) => {
            if (e.which === KeyCode.Enter) {
                callback();
            }
        };

        const didMount = () => {
            DeviceEventEmitter.addListener(KeyUpEventName, listener);
        }
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(KeyUpEventName, listener);
        }

        didMount();

        return willUnmount;
    }, [callback, ...deps]);
}

export function useArrowUp(callback: () => void, deps: any[] = []): void {
    useEffect(() => {
        const listener = (e: IEventType) => {
            if (e.which === KeyCode.Up) {
                callback();
            }
        };

        const didMount = () => {
            DeviceEventEmitter.addListener(KeyUpEventName, listener);
        }
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(KeyUpEventName, listener);
        }

        didMount();

        return willUnmount;
    }, [callback, ...deps]);
}

export function useArrowDown(callback: () => void, deps: any[] = []): void {
    useEffect(() => {
        const listener = (e: IEventType) => {
            if (e.which === KeyCode.Down) {
                callback();
            }
        };

        const didMount = () => {
            DeviceEventEmitter.addListener(KeyUpEventName, listener);
        }
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(KeyUpEventName, listener);
        }

        didMount();

        return willUnmount;
    }, [callback, ...deps]);
}
