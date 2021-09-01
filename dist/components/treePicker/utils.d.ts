import { ReactText } from 'react';
import { IOption } from './interface';
export declare const getDefaultValue: (options: IOption[]) => ReactText[];
export declare const getDefaultColumns: (options: IOption[]) => Array<Omit<IOption, 'children'>[]>;
