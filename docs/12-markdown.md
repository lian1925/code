# 文章模板约定

每篇文章由元数据与正文构成，其中正文是文章的主体内容，而元数据用于描述文章的基本属性，包括 5 项数据：

- 第一项是 title，表示文章标题
- 第二项是 createAt，表示文章创建时间
- 第三项是 updateAt，表示文章更新时间
- 第四项是 tags，表示文章的标签，可用于归类
- 第五项是 author，表示文章的作者

示例：

````md
---
title: ECMAScript 7 品鲜
createAt: 2019-4-8 10:07:10
updateAt: 2019-4-8 10:07:11
tags: 前端
author: lian
---

# ECMAScript 7 品鲜

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
````

# Markdown 解析

在本项目中，Markdown 解析是核心功能之一，它负责将用户撰写的 Markdown 文章解析，生成约定格式的 json 数据源，提供给 reactJs 或 vuesJs 渲染展示。

Markdown 解析的工作流程如下：  
1、遍历指定目录下的 Markdown 文件，若是遇到子目录，需要递归处理，防止遗漏文件；  
2、遍历得到的文件进行 Markdown 解析，生成约定格式的 json 数据源，放置于指定目录下；  
3、生成概要文件，记录遍历得到的源文件与生成文件信息，命名为 summary.json；

# 实践

clone 本项目，执行如下命令，即可生成 Markdown 数据源。

```bash
# 1 安装相关依赖
npm install

# 2 生成数据源
npm run generate

# 3 查看数据源
ls generate

```
