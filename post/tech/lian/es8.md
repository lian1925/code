---
title: ECMAScript 8 新特性
createAt: 2019-4-17 10:07:10
updateAt: 2019-4-17 10:07:11
tags: 前端
author: lian
---

# ECMAScript 8

1、添加 String.padStart 和 String.padEnd
功能：填充字符串，以达到指定长度。

- 当指定长度小于等于原字符串长度时，返回原字符串
- 当指定长度大于原字符串长度时，用指定字符串填充，若是未指定字符串，则用空字符填充。
  示例

```js
// 前置填充
"es8".padStart(5) => "  es8"

"es8".padStart(5,"lian") => "lies8"
// 后置填充
"es8".padEnd(5) => "es8  "

"es8".padEnd(5,"lian") => "es8li"
```

<!-- more -->

2、添加 Object.values 和 Object.entries
功能：返回指定对象的枚举属性值（属性，值）的数组
示例：

```js
const obj = {x:1,y:2}
Object.values(obj) => [1,2]

Object.entries(obj) => [[x,1],[y,2]]
```

3、添加 Object.getOwnPropertyDescriptors
功能：返回指定对象的所有属性描述符
示例：

```js
const obj = {
  get age(){
    return 10;
  }
}
Object.getOwnPropertyDescriptors(obj) =>
{age:{configurable:true,enumerable:true,get:function age(){},set:undefined}}
```

4、增强字符串模版
示例：

```js
const version = 8;
function helper(strs,...keys){
  const addit = keys[0]===8? "better":"good";
  return `${strs[0]} ${keys[0]} ${strs[1]} ${addit}`
}

helper `ES ${version} is` => ES8 is better
```

(待续)
