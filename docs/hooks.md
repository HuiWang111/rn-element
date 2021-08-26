# Hooks

### useKeyUp
keyup事件监听，会在willUnmount时自动注销事件
```tsx
import { useKeyUp } from 'rn-element';

// ...
useKeyUp((e) => {
    if (e.which === KeyCode.Enter) {
        isTabEnter.current = true;

        if (isActive && keyboard) {
            onEnter?.();
        }
    } else {
        isTabEnter.current = false;
    }
}, [isActive]);
```

### useArrowUp
监听上键的keyup事件，会在willUnmount时自动注销事件
```tsx
import { useArrowUp } from 'rn-element';

// ...
useArrowUp(() => {
    if (!keyboard || isAllInactivable || !onChange) return;

    if (activeIndex > firstActivableIndex) {
        onChange(isActivableList.lastIndexOf(true, activeIndex - 1));
    } else if (loop) {
        scrollViewRef.current?.scrollToEnd({ animated: true });
        onChange(lastActivableIndex);
    }
}, [activeIndex, keyboard, isAllInactivable]);
```

### useArrowDown
监听下键的keyup事件，会在willUnmount时自动注销事件
```tsx
import { useArrowDown } from 'rn-element';

// ...
useArrowDown(() => {
    if (!keyboard || isAllInactivable || !onChange) return;

    if (activeIndex < lastActivableIndex) {
        onChange(isActivableList.indexOf(true, activeIndex + 1));
    } else if (loop) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        onChange(firstActivableIndex);
    }
}, [activeIndex, keyboard, isAllInactivable]);
```

### useEnter
监听回车键的keyup事件，会在willUnmount时自动注销事件
```tsx
import { useEnter } from 'rn-element';

// ...
useEnter(() => {
    if (isEnterable) {
        onEnter?.();
    }
}, [isEnterable]);
```