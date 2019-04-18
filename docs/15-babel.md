# 简介

babel 是一个 JavaScript 编译器，将 ECMAScript 2015+ 版本的代码 转换成向下兼容的 JavaScript 语法。
核心功能：语法转换，通过 polyfill 方式在目标环境中添加特性，源码转换。
功能矩阵：ES2015+ ,jsx, TypeScript, 自定义插件

# ES2015+

这部分实现的功能为：将 ES2015+ 语法的 JavaScript 代码编译为可以在当前浏览器上工作的代码，其工作包括：新语法的转换和缺失特性的修补。

整体配置过程如下：
1、安装所需的依赖包。

```bash
# 新语法转换
npm install --save-dev @babel/core @babel/cli @babel/preset-env
# 缺失特性修补
npm install --save @babel/polyfill
```

说明：
@babel/core，包含了 babel 的核心功能。
@babel/cli，实现了从命令行使用的功能。
@babel/preset-env，本质是 babel 插件，实现了代码转换功能。
@babel/polyfill，包含 core-js 和 regenerator runtime 模块，实现模拟完整的 ES2015 环境。

2、创建配置文件，约定命名为 babel.config.js

```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        ie: "9",
        firefox: "60",
        chrome: "67",
        safari: "11.1"
      },
      modules: false,
      debug: true,
      useBuiltIns: "usage"
    }
  ]
];

module.exports = { presets };
```

注意：实际项目中，可以根据各自的浏览器兼容需求，灵活配置 target 参数。理论上，兼容面越广，打包代码越多，故须结合实际情况权衡。

3、编译
您可以选择使用 babel 命令，将指定目录下（如：src）的代码，编译到指定目录下（如：dist）

```bash
npx babel src --out-dir dist
```

4、与 webpack 集成

```bash
# 安装loader
npm install --save-dev babel-loader

# 在webpack配置文件添加如下内容
module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
```

## 技能加点

结合 babel 提升 vs code 编辑器的开发体验，前端开发技能成长++2。
1、支持 babel 最新语法的高亮功能，安装 [sublime-babel-vscode](https://marketplace.visualstudio.com/itemdetails?itemName=joshpeng.sublime-babel-vscode) 扩展并按照说明进行操作。

2、FiraCode 是众多编程字体中公认颜值 Max，特别在符号颜值方面所向披靡，可参考[说明](https://github.com/tonsky/FiraCode)进行操作。

## jsx

ReactJs 框架引入了一种新的语法 jsx，这种语法将 js 与 dom 代码写在一起。这部分的实现功能为将该语法写的代码编译成可以在当前浏览器工作的代码。

整体配置如下：
1、安装依赖包

```bash
npm install --save-dev @babel/preset-react
```

2、在配置文件 babel.config.js 上，添加内容

```js
{
  "presets": ["@babel/preset-react"]
}
```

## typescript

TypeScript 作为 JavaScript 的超集，引入了强类型检查，非常适合编写大型的项目。这部分的实现功能为将该语法写的代码编译成可以在当前浏览器工作的代码。

整体配置如下：
1、安装依赖包

```bash
npm install --save-dev @babel/preset-typescript

```

2、在配置文件 babel.config.js 上，添加内容

```js
{
  "presets": ["@babel/preset-typescript"]
}
```
