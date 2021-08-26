import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { KeyCode } from '../constants';
const KeyUpEventName = 'keyup';
export function useKeyUp(listener, deps = []) {
    useEffect(() => {
        const didMount = () => {
            DeviceEventEmitter.addListener(KeyUpEventName, listener);
        };
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(KeyUpEventName, listener);
        };
        didMount();
        return willUnmount;
    }, [listener, ...deps]);
}
export function useEnter(callback, deps = []) {
    useEffect(() => {
        const listener = (e) => {
            if (e.which === KeyCode.Enter) {
                callback();
            }
        };
        const didMount = () => {
            DeviceEventEmitter.addListener(KeyUpEventName, listener);
        };
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(KeyUpEventName, listener);
        };
        didMount();
        return willUnmount;
    }, [callback, ...deps]);
}
export function useArrowUp(callback, deps = []) {
    useEffect(() => {
        const listener = (e) => {
            if (e.which === KeyCode.Up) {
                callback();
            }
        };
        const didMount = () => {
            DeviceEventEmitter.addListener(KeyUpEventName, listener);
        };
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(KeyUpEventName, listener);
        };
        didMount();
        return willUnmount;
    }, [callback, ...deps]);
}
export function useArrowDown(callback, deps = []) {
    useEffect(() => {
        const listener = (e) => {
            if (e.which === KeyCode.Down) {
                callback();
            }
        };
        const didMount = () => {
            DeviceEventEmitter.addListener(KeyUpEventName, listener);
        };
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(KeyUpEventName, listener);
        };
        didMount();
        return willUnmount;
    }, [callback, ...deps]);
}
