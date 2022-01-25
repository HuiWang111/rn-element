import { IOption, IOptionWithChildren } from './interface';
export declare const getDepth: (options: IOptionWithChildren[]) => number;
export declare const getListByDepth: (depth: number, options: IOptionWithChildren[], value: string[], filterOption: (k: string, o: IOption) => boolean, keyword?: string | undefined) => IOption[];
export declare const getLabelsByValue: (options: IOptionWithChildren[], value: string[]) => string[];
