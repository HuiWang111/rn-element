import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { KeyCode } from '../constants';
const KeyUpEventName = 'keyup';
export function useKeyUp(listener, deps = []) {
    useEffect(() => {
        let subscription;
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener);
        };
        const willUnmount = () => {
            subscription === null || subscription === void 0 ? void 0 : subscription.remove();
        };
        didMount();
        return willUnmount;
    }, [listener, ...deps]);
}
export function useEnter(callback, deps = []) {
    useEffect(() => {
        let subscription;
        const listener = (e) => {
            if (e.which === KeyCode.Enter) {
                callback();
            }
        };
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener);
        };
        const willUnmount = () => {
            subscription === null || subscription === void 0 ? void 0 : subscription.remove();
        };
        didMount();
        return willUnmount;
    }, [callback, ...deps]);
}
export function useArrowUp(callback, deps = []) {
    useEffect(() => {
        let subscription;
        const listener = (e) => {
            if (e.which === KeyCode.Up) {
                callback();
            }
        };
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener);
        };
        const willUnmount = () => {
            subscription === null || subscription === void 0 ? void 0 : subscription.remove();
        };
        didMount();
        return willUnmount;
    }, [callback, ...deps]);
}
export function useArrowDown(callback, deps = []) {
    let subscription;
    useEffect(() => {
        const listener = (e) => {
            if (e.which === KeyCode.Down) {
                callback();
            }
        };
        const didMount = () => {
            subscription = DeviceEventEmitter.addListener(KeyUpEventName, listener);
        };
        const willUnmount = () => {
            subscription === null || subscription === void 0 ? void 0 : subscription.remove();
        };
        didMount();
        return willUnmount;
    }, [callback, ...deps]);
}
