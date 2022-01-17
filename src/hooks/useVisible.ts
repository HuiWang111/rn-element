import { useState } from 'react'

export const useVisible = (defaultVisible = false, onVisibleChange?: (visible: boolean) => void): [boolean, () => void, () => void] => {
    const [visible, setVisible] = useState(defaultVisible)

    return [
        visible,
        () => {
            setVisible(true)
            onVisibleChange?.(true)
        },
        () => {
            setVisible(false)
            onVisibleChange?.(false)
        }
    ]
}
