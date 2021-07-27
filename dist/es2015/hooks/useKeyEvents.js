import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
export function useKeyEvents(eventName, listener, deps = []) {
    useEffect(() => {
        const didMount = () => {
            DeviceEventEmitter.addListener(eventName, listener);
        };
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(eventName, listener);
        };
        didMount();
        return willUnmount;
    }, deps);
}
