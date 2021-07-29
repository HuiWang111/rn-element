import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';

interface IEventType {
    which: number;
}

type EventListener = (event: IEventType) => void;

export function useKeyEvents(eventName: string, listener: EventListener, deps: any[] = []): void {
    useEffect(() => {
        const didMount = () => {
            DeviceEventEmitter.addListener(eventName, listener);
        }
        const willUnmount = () => {
            DeviceEventEmitter.removeListener(eventName, listener);
        }

        didMount();

        return willUnmount;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}