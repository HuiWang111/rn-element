import { useState } from 'react';
export const useVisible = (defaultVisible = false, onVisibleChange) => {
    const [visible, setVisible] = useState(defaultVisible);
    return [
        visible,
        () => {
            setVisible(true);
            onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(true);
        },
        () => {
            setVisible(false);
            onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(false);
        }
    ];
};
