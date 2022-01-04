import React, { ReactElement, PropsWithChildren, Component } from 'react';
import { IFieldEntity, IFieldProps, ValueType } from './interface';
export declare class Field extends Component<PropsWithChildren<IFieldProps>> implements IFieldEntity {
    static contextType: React.Context<import("./interface").IFormStore<any>>;
    static displayName: string;
    init: boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    reRender: () => void;
    validateRules: (value: ValueType) => Promise<boolean>;
    getControlled: (childProps: Record<string, any>) => Record<string, any>;
    render(): ReactElement | null;
}
