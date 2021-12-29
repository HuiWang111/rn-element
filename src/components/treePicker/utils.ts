import { ReactText } from 'react';
import { IOptionWithChildren } from './interface';

export const getDefaultValue = (options: IOptionWithChildren[]): ReactText[] => {
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

export const getDefaultColumns = (options: IOptionWithChildren[]): Array<Omit<IOptionWithChildren, 'children'>[]> => {
    const value: Array<Omit<IOptionWithChildren, 'children'>[]> = [];

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

export const getDepth = (options: IOptionWithChildren[]): number => {
    if (!options.length) {
        return 0
    }

    let depth = 1
    const recursive = (item: IOptionWithChildren, acc = 1) => {
        depth = Math.max(depth, acc)
        if (item.children && item.children.length) {
            item.children.forEach(c => recursive(c, acc + 1))    
        }
    }

    options.forEach(option => recursive(option))

    return depth;
}