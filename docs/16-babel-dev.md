## 编写 babel 插件

## 编译器

babel 的本质是 JavaScript 编译器，其工作原理：babel 接收新语法写的 JavaScript，并根据约定规则更改代码，最后返回生成的代码。

这里的核心工作是正确地更改代码，这些处理每一步都涉及到抽象语法树（AST）。

简单来说，抽象语法树是一种表述代码的方式，以树结构的方式表述代码。

示例：
1、假如存在一段代码如下：

```js
function square(n) {
  return n * n;
}
```

2、用抽象语法树表述如下：

```js
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  params: [{
    type: "Identifier",
    name: "n"
  }],
  body: {
    type: "BlockStatement",
    body: [{
      type: "ReturnStatement",
      argument: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "n"
        },
        right: {
          type: "Identifier",
          name: "n"
        }
      }
    }]
  }
}
```

## babel 工作原理

语法抽象树由多个节点组成。如：

```js
{
  type: "FunctionDeclaration",
  id: {...},
  params: [...],
  body: {...}
}
{
  type: "Identifier",
  name: ...
}
{
  type: "BinaryExpression",
  operator: ...,
  left: {...},
  right: {...}
}
```

每个节点表示如下：

```js
interface Node {
  type: string;
}
```

babel 的处理步骤为：解析，转换，生成。

## 解析

解析分为两个阶段：词法解析和语法解析。

1、词法解析，将字符串形式的代码转换成令牌流(tokens)，令牌是一个扁平的语法片段数组。
示例：

```js
// 原生代码
n * n
// 令牌流
[
  { type: { ... }, value: "n", start: 0, end: 1, loc: { ... } },
  { type: { ... }, value: "*", start: 2, end: 3, loc: { ... } },
  { type: { ... }, value: "n", start: 4, end: 5, loc: { ... } },
  ...
]
```

2、语法解析，将令牌流转换成抽象语法树。

## 转换

转换阶段，对抽象语法树进行遍历，遍历过程中对节点进行添加、更新、移除等操作。这个过程是 babel 最为复杂的工作。

访问者，一个用于遍历抽象语法树的跨语言模式。当我们进入一个节点时，意味着我们在访问它们。

示例：
一个简单的访问者，遍历抽象语法树过程中，每遇到一个 Identifier 的时候，都会触发 Identifier()方法。

```js
// 定义访问者
const MyVisitor = {
  Identifier() {
    console.log("Called!");
  }
};

// 一段代码
function square(n) {
  return n * n;
}
// 遍历触发
path.traverse(MyVisitor);
Called!
Called!
Called!
Called!
```

路径，表示节点的关联关系。某种意义上，路径是一个节点在树中的位置以及关于该节点的各种信息的动态表示。
实际上，当访问一个节点时，真正访问的对象是路径而非节点。

示例：

```js
// 假设存在如下的节点
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  ...
}
// 将子节点表示为一个路径的话，看起来是这样的。
{
  "parent": {
    "type": "FunctionDeclaration",
    "id": {...},
    ....
  },
  "node": {
    "type": "Identifier",
    "name": "square"
  }
}
// 访问路径
const MyVisitor = {
  Identifier(path) {
    console.log("Visiting: " + path.node.name);
  }
};
a + b + c;
path.traverse(MyVisitor);
Visiting: a
Visiting: b
Visiting: c
```

作用域，某种意义上，表示一个变量能影响的范围。

```js
// global scope

function scopeOne() {
  // scope 1

  function scopeTwo() {
    // scope 2
  }
}
// 作用域的表示法
{
  path: path,
  block: path.node,
  parentBlock: path.parent,
  parent: parentScope,
  bindings: [...]
}
```

创建一个新的作用域时，需要给出它的路径和父作用域，之后在遍历过程中，它会在该作用域内收集所有的绑定。

绑定，所有的引用属于特定的作用域，引用和作用域的关系称为绑定。
示例

```js

{
  identifier: node,
  scope: scope,
  path: path,
  kind: 'var',

  referenced: true,
  references: 3,
  referencePaths: [path, path, path],

  constant: false,
  constantViolations: [path]
}
```

## 模块

babel 实际上是由一些重要模块的组合，整体组成如下。

## 解析器 babylon

1、安装依赖包

```bash
$ npm install --save babylon
```

2、使用，解析字符串

```js
import * as babylon from "babylon";

const code = `function square(n) {
  return n * n;
}`;

babylon.parse(code);
// Node {
//   type: "File",
//   start: 0,
//   end: 38,
//   loc: SourceLocation {...},
//   program: Node {...},
//   comments: [],
//   tokens: [...]
// }
```

### 遍历 babel-traverse

1、安装依赖包

```bash
$ npm install --save babel-traverse
```

2、使用，遍历与更新节点

```js
import * as babylon from "babylon";
import traverse from "babel-traverse";

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
    if (path.node.type === "Identifier" && path.node.name === "n") {
      path.node.name = "x";
    }
  }
});
```

### 生成器 babel-generator

1、安装依赖包

```bash
$ npm install --save babel-generator
```

2、使用，将语法抽象树生成代码

```js
import * as babylon from "babylon";
import generate from "babel-generator";

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

generate(ast, {}, code);
// {
//   code: "...",
//   map: "..."
// }
```

### 函数式工具库 babel-types

1、安装依赖包

```bash
$ npm install --save babel-types
```

2、使用，遍历与更新节点

```js
import traverse from "babel-traverse";
import * as t from "babel-types";

traverse(ast, {
  enter(path) {
    if (t.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  }
});
```

### 模版 babel-template

它能让你编写字符串形式且带有占位符的代码来替代手动编码，在生成大规范 ast 时，这是非常实用的功能。
1、安装依赖包

```bash
$ npm install --save babel-template
```

2、使用，生成代码

```js
import template from "babel-template";
import generate from "babel-generator";
import * as t from "babel-types";

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});

console.log(generate(ast).code);
// var myModule = require("my-module");
```

## 访问者模式

定义：封装一些操作，这些操作可以作用于某种数据结构的各个元素，却不会改变被作用的元素。
示例：
我们知道，财务是有一本账单。账单可以看作是一个对象结构，它的元素有两种：收入和支出。
查看账单的人可能有：老板，财务主管，会计事务所的注册会计，而不同的人看账单的目的和行为是不同的。

整体流程如下：
1、定义账单接口，它会提供一个访问的方法。

```java
public interface Bill{
  void accept(AccountBookViewer viewer);
}
```

2、定义各个元素，收入与支出。

```java
public class Consumer implements Bill{
  private double amount;
  private String item;
  public void accept(AccountBookViewer viewer){
    viewer.view(this)
  }
}
public class Income implements Bill{
  private double amount;
  private String item;
  public void accept(AccountBookViewer viewer){
    viewer.view(this)
  }
}
```

3、定义访问者接口，作用于不同的元素，查看消费与支出。

```java
public intereface AccountBookViewer{
  void view(Consumer bill);
  void view(Income bill);
}
```

4、定义不同的访问者，老板，只关心总收入与支出；注册会计师，关心是否纳税。

```java
public class Boss implements AccountBookViewer{
  private double totalIncome;
  private double totalConsumer;
  public void view(Consumer bill){
    totalConsumer += bill.getAmount();
  }
  public void view(Income bill){
    totalIncome += bill.getAmount()
  }
}

public class CPA implements AccountBookViewer{
  public void view(Consumer bill){
    System.out.println('支出工资是否纳个税')
  }
  public void view(Income bill){
    System.out.println('收入是否纳增值税')
  }
}
```

5、定义账单对象，包括添加单子和展示功能。

```java
public class AccountBook {
  private List<Bill> billList = new ArrayList<Bill>();
  public void addBill(Bill bill){
    billList.add(bill)
  }
  public show(AccountBookViewer viewer){
    for(Bill bill: billList){
      bill.accept(viewer)
    }
  }
}
```
