# 问题集锦

本文档用于记录项目构建与开发过程中，遇到的问题与解决思路。

# TypeScript 相关

## 问题 1

复现：  
在组件中引入 antd 的 Button 组件。

```tsx
<Button>click</Button>
```

发生错误：

TS2740: Type '{ type: "primary"; }' is missing the following properties from type 'Pick<Pick<(Readonly<AnchorButtonProps> & Readonly<{ children?: ReactNode; }>) | (Readonly<NativeButtonProps> & Readonly<{ children?: ReactNode; }>), "style" | "title" | "children" | ... 256 more ... | "block"> & Pick<...> & Pick<...>, "style" | ... 256 more ... | "shape">': style, title, children, prefixCls, and 253 more.

解决思路：  
antd 与 react 对于 Button 的类型申明不一致，导致 typescript 的自动类型推导失败。antd 官方于两天前修复，坐等更新。

参考：https://github.com/ant-design/ant-design/issues/15930
