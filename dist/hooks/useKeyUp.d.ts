interface IEventType {
    which: number;
}
declare type EventListener = (event: IEventType) => void;
export declare function useKeyUp(listener: EventListener, deps?: any[]): void;
export declare function useEnter(callback: () => void, deps?: any[]): void;
export declare function useArrowUp(callback: () => void, deps?: any[]): void;
export declare function useArrowDown(callback: () => void, deps?: any[]): void;
export {};
