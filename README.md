# rn-element

## install
```shell
npm i rn-element
```

## generate version
```shell
npm run version -- --patch # bugfix
npm run version -- --minor # new feature
npm run version -- --major # break api
```

## usage docs
- [config-provider](https://github.com/HuiWang111/rn-element/blob/main/docs/config-provider.md)
- [constants](https://github.com/HuiWang111/rn-element/blob/main/docs/constants.md)
- [download](https://github.com/HuiWang111/rn-element/blob/main/docs/download.md)
- [enterable](https://github.com/HuiWang111/rn-element/blob/main/docs/enterable.md)
- [form](https://github.com/HuiWang111/rn-element/blob/main/docs/form.md)
- [hooks](https://github.com/HuiWang111/rn-element/blob/main/docs/hooks.md)
- [list](https://github.com/HuiWang111/rn-element/blob/main/docs/list.md)
- [loading](https://github.com/HuiWang111/rn-element/blob/main/docs/loading.md)
- [modal](https://github.com/HuiWang111/rn-element/blob/main/docs/modal.md)
- [number-input](https://github.com/HuiWang111/rn-element/blob/main/docs/number-input.md)
- [page](https://github.com/HuiWang111/rn-element/blob/main/docs/page.md)
- [radio-list](https://github.com/HuiWang111/rn-element/blob/main/docs/radio-list.md)
- [theme-provider](https://github.com/HuiWang111/rn-element/blob/main/docs/theme-provider.md)
- [toast](https://github.com/HuiWang111/rn-element/blob/main/docs/toast.md)
- [webView](https://github.com/HuiWang111/rn-element/blob/main/docs/webView.md)

## Todo
1. Form校验只提示第一个错误
2. 增加Input组件
    - clearable属性
    - editable为false时灰色背景、
3. 增加按钮组件
    - 支持主题色背景
4. 增加一个基于 `StyleSheet.create` 的样式方法
    - 实现有padding时宽度自动减去padding的值
5. 部分组件需要使用类似title这类属性，是否判断传入字符串的话自动包裹 `Text` 组件
    - 自动包裹的话样式不好灵活自定义
    - 可能会造成困惑，有些可以传字符串，有些却必须自己包裹 `Text` 组件
