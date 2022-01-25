import { IDateInformation } from './interface';
export declare function getPanelDays(year?: number, m?: number): IDateInformation[];
export declare function getMonthDays(year: number, month: number, compareMonth: number, count?: number, tail?: boolean): IDateInformation[];
export declare function getPrevious(year: number, month: number): [number, number];
export declare function getNext(year: number, month: number): [number, number];
