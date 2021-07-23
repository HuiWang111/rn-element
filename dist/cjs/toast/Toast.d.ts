interface IShowToastOptions extends Record<string, unknown> {
    duration?: number;
    position?: number;
    shadow?: boolean;
    animation?: boolean;
    hideOnPress?: boolean;
    delay?: number;
    onShow?: () => void;
    onShown?: () => void;
    onHide?: () => void;
    onHidden?: () => void;
}
export declare class Toast {
    private static setDefaultOptions;
    private static handleMessage;
    static show(message: string, options?: IShowToastOptions): void;
    static success(message: string, options?: IShowToastOptions): void;
    static error(message: string, options?: IShowToastOptions): void;
    static warning(message: string, options?: IShowToastOptions): void;
}
export {};
