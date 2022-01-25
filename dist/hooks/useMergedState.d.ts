import { Dispatch, SetStateAction } from 'react';
export declare const useMergedState: <S>(state?: S | (() => S) | undefined, options?: {
    defaultValue?: S | undefined;
    defaultTypeValue?: S | undefined;
    onChange?: ((v: S | undefined) => void) | undefined;
} | undefined) => [S | undefined, Dispatch<SetStateAction<S>>, (val: S, p?: S | undefined) => void];
