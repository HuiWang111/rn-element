export interface IToastOptions {
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
    static show(message: string, options?: IToastOptions): void;
    static success(message: string, options?: IToastOptions): void;
    static error(message: string, options?: IToastOptions): void;
    static warning(message: string, options?: IToastOptions): void;
}
