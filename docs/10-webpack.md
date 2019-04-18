# 简介

webpack 是一个 JavaScript 程序的静态模块打包器。其工作原理是：webpack 以递归方式构建一个关系依赖图，囊括 JavaScript 程序需要的各个模块，然后将这些模块打包成一个或多个依赖包(bundle)。

# 配置矩阵

webpack 配置的组成矩阵：入口 entry，输出 output，加载器 loader，插件 plugin。

## 入口

用法:

```js
// 简写语法
entry: string | string[]
// 对象语法
entry: {
  [entryChunkName: string]: string | string[]
}
```

## 输出

用法：

```js
// 简写语法
output: {
  filename:  string,
  path: string,
  publicPath: string
}

// 示例
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

## 模式(补充)

配置模式 mode，告知 webpack 使用相应模式的内置优化。

```js
// 用法
{
  mode: "development" | "production";
}

// 示例
module.exports = {
  mode: "development"
};
// development 等效于
module.exports = {
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
};
module.exports = {
  mode: "production"
};
// production 等效于
module.exports = {
  plugins: [
    new UglifyJsPlugin(/* ... */),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
```

# 加载器

加载器，允许你在加载文件时对文件进行预处理。
整体配置如下：
1、安装依赖包，如 ts-loader

```bash
npm install --save-dev ts-loader
```

2、在配置文件 webpack.config.js 上，添加内容

```js
{
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }];
  }
}
```

# 插件

插件是 webpack 的核心功能。其本质是一个 JavaScript 对象，内置一个 apply 方法，通过此方法可访问 webpack 的 compiler 对象。

示例：

```js
const pluginName = "ConsoleLogOnBuildWebpackPlugin";

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log("webpack 构建过程开始！");
    });
  }
}
```

整体配置如下：
1、安装依赖包

```bash
npm install --save-dev html-webpack-plugin
```

2、在配置文件 babel.config.js 上，添加内容

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })]
};

module.exports = config;
```

## web 服务器

webpack 提供一个简单的 web 服务器 webpack-dev-server，让我们在开发时启动 web 服务。

整体配置如下：

1、安装依赖包

```bash
npm i --save-dev webpack-dev-server webpack-merge
```

2、在配置文件 package.json 上，添加内容

```json
{
  "scripts": {
    "dev": "webpack-dev-server --open --config webpack.config.js"
  }
}
```

3、在配置文件 webpack.config.js 上，添加内容

```js
{
  // 使用 source map
  devtool:'inline-source-map',
  // 服务器参数
  devServer:{
    contentBase:"./dist"
  }
}
```

## 实践

1、安装依赖包

```bash
npm install --save-dev webpack webpack-cli webpack-merge
```

2、配置启动命令
在配置文件 package.json 上，添加内容

```js
{
  "scripts":{
    "start":"webpack --config webpack.config.js"
  }
}
```

3、添加解析规则
在配置文件 webpack.config.js 上，添加内容

```js
{
  "resolve": {
    extensions:['.js','.ts','.tsx'],
    alias:{
      "@": path.resolve(__dirname, 'src/'),
      utils: path.resolve(__dirname,'src/utils/')
    }
  }
}
```

## 常用加载器(附录)

1、加载 css

```js
// 安装依赖包
npm install --save-dev style-loader css-loader

// 在配置文件 webpack.config.js 上，添加内容
{
  test:/\.css$/,
  use:[
    'style-loader',
    'css-loader'
  ]
}
```

2、加载 less

```js
// 安装依赖包
npm install --save-dev less-loader less

// 在配置文件 webpack.config.js 上，添加内容
{
  test:/\.less$/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader"
    },
    {
      loader: "less-loader"
    }
  ]
}
```

3、加载图片

```js
// 安装依赖包
npm install --save-dev file-loader

// 在配置文件 webpack.config.js 上，添加内容
{
  test: /\.(png|svg|jpg|gif)$/,
  use:'file-loader'
}

```

4、加载 ts

```js
// 安装依赖包
npm install --save-dev ts-loader

// 在配置文件 webpack.config.js 上，添加内容
{
  test: /\.tsx?$/,
  use:'ts-loader'
}
```

5、加载 ts

```js
// 安装依赖包
npm install --save-dev awesome-typescript-loader


// 在配置文件 webpack.config.js 上，添加内容
{
  test: /\.tsx?$/,
  use:'awesome-typescript-loader'
},
{
  enforce:"pre",
  test:/\.js$/,
  loader:"source-map-loader"
}
```

6、加载 json

```js
// 安装依赖包
npm install --save-dev json-loader


// 在配置文件 webpack.config.js 上，添加内容
{
  test: /\.json$/,
  use:'json-loader'
}
```

## 常见插件(附录)

1、html-webpack-plugin

```js
// 安装依赖包
npm install --save-dev html-webpack-plugin

// 在配置文件 webpack.config.js 上，添加内容
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  plugins:[
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: true
      })
  ]
}
```

2、clean-webpack-plugin

```js
// 安装依赖包
npm install --save-dev clean-webpack-plugin

// 在配置文件 webpack.config.js 上，添加内容
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  plugins:[
    new CleanWebpackPlugin(['dist'])
  ]
}

```

3、uglifyjs-webpack-plugin

```js
// 安装依赖包
npm install --save-dev uglifyjs-webpack-plugin

// 在配置文件 webpack.config.js 上，添加内容
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = {
  plugins:[
        new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      },
      sourceMap: true
    }),
  ]
}
```

4、copy-webpack-plugin

```js
// 安装依赖包
npm install --save-dev copy-webpack-plugin

// 在配置文件 webpack.config.js 上，添加内容
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    plugins: [
    new CopyWebpackPlugin([{ from: "src/images", to: "images" }])
  ]
}
```

5、webpack-bundle-analyzer

```js
// 安装依赖包
npm install --save-dev webpack-bundle-analyzer

// 在配置文件 webpack.config.js 上，添加内容
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const config = {
    plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```
