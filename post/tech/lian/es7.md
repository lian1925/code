---
title: ECMAScript 7 品鲜
createAt: 2019-4-8 10:07:10
updateAt: 2019-4-8 10:07:11
tags: 前端
author: lian
---

# ECMAScript 7 品鲜

1、添加 Array.prototype.includes 函数
功能：判断是否包含某个元素。

需要注意的是，includes 函数与 indexOf()函数功能类似，其用法辨析如下：

```js
// 当元素为NaN时
  [NaN].includes(NaN) => true
  [NaN].indexOf(NaN) => -1

// 当元素为 +0 与 -0 时
  [+0].includes(-0) => true
  [+0].indexOf(-0) => 0
```

2、添加取幂运算符号 \*\*
示例：

```js
2 \*\* 3 === Math.pow(2,3) => true, 8
```

(待续)
