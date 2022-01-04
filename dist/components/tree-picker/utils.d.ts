import { ReactText } from 'react';
import { IOption, IOptionWithChildren } from './interface';
export declare const getDepth: (options: IOptionWithChildren[]) => number;
export declare const getListByDepth: (depth: number, options: IOptionWithChildren[], value: ReactText[], keyword?: string | undefined) => IOption[];
