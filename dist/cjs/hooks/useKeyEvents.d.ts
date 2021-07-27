interface IEventType {
    which: number;
}
declare type EventListener = (event: IEventType) => void;
export declare function useKeyEvents(eventName: string, listener: EventListener, deps?: any[]): void;
export {};
