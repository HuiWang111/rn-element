import { ReactText } from 'react';
import { IOption } from './interface';

export const getDefaultValue = (options: IOption[]): ReactText[] => {
    const value: ReactText[] = [];

    if (options.length) {
        const firstDepthOption = options[0];
        value.push(firstDepthOption.value);

        if (firstDepthOption.children?.length) {
            const secondaryDepthOption = firstDepthOption.children[0];
            value.push(secondaryDepthOption.value);

            if (secondaryDepthOption.children?.length) {
                const thirdDepthOption = secondaryDepthOption.children[0];
                value.push(thirdDepthOption.value);
            }
        }
    }

    return value;
}

export const getDefaultColumns = (options: IOption[]): Array<Omit<IOption, 'children'>[]> => {
    const value: Array<Omit<IOption, 'children'>[]> = [];

    if (options.length) {
        const firstDepthOption = options[0];
        value.push(options.map(o => ({ label: o.label, value: o.value })));

        if (firstDepthOption.children?.length) {
            const secondaryDepthOption = firstDepthOption.children[0];
            value.push(firstDepthOption.children.map(o => ({ label: o.label, value: o.value })));

            if (secondaryDepthOption.children?.length) {
                value.push(secondaryDepthOption.children);
            }
        }
    }

    return value;
}