## 导航

### 整体架构

[1、架构图 Todo]()

[2、Markdown 数据源](/docs/12-markdown.md)

[3、react 展示层 Todo]()

[4、数据服务层 Todo](/docs/20-service.md)

### 知识梳理

[1、强类型赋能 Typescript](/docs/18-typescript.md)

[2、构建必备 webpack](/docs/10-webpack.md)

[3、编译硬核 babel](/docs/15-babel.md)

[3、基础知识 react](/docs/17-react.md)

[4、状态管理 redux Todo]()

[5、阿里组件 antd Todo]()

[6、ECMAScript 7 & 8](/docs/11-ecmascript.md)

[7、问题集锦](/docs/13-question.md)

## 项目特色

1、同时支持`markdown文件`和`数据库`作为数据源  
2、提供统一的数据层抽象  
3、支持 ReactJs 和 VueJs 作为前端展示引擎

## 适用场景

前端团队管理博客与资源

程序员记录博客

And so on ...

## 实践

1、下载项目，并安装依赖项

```bash
npm install
```

2、执行如下命令，进入开发模式

```bash
npm run start
```

3、创建新文章

执行如下命令，将会在 post 目录下生成一篇新文章。

```
npm run new [title] [dirname]
```

说明：

title 代表文章标题  
dirname 代表文章目录，默认为`/post/tech`

4、编译数据源

执行如下命令，将会根据 post 目录下内容，生成数据源文件，并放于 src/public/generate 目录下。

```bash
npm run generate
```

5、监听 markdown 文件改动

执行如下命令，将自动监听`/post`目录下的 markdown 文件改动，并自动在浏览器刷新效果。

```
npm run generate:watch
```

6、执行如下命令，生成打包后的生产环境代码

```bash
npm run build
```
