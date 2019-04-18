# 导航

### 整体架构

[1、架构图 Todo]()

[2、Markdown 数据源](/docs/12-markdown.md)

[3、react 展示层 Todo]()

### 知识梳理

[1、强类型赋能 Typescript](/docs/18-typescript.md)

[2、构建必备 webpack](/docs/10-webpack.md)

[3、编译硬核 babel](/docs/15-babel.md)

[3、基础知识 react](/docs/17-react.md)

[4、状态管理 redux Todo]()

[5、阿里组件 antd Todo]()

[6、ECMAScript 7 & 8](/docs/11-ecmascript.md)

[7、问题集锦](/docs/13-question.md)

# 1 项目特色

1、同时支持`markdown文件`和`数据库`作为数据源  
2、提供统一的数据层抽象  
3、支持 ReactJs 和 VueJs 作为前端展示引擎

# 2 适用场景

前端团队管理博客与资源

程序员记录博客

And so on ...

# 3 目录结构

```bash
|- post 文章
|- generate 生成数据
|- dist 生产文件
|- build 构建文件
|- src 源代码
|- config 配置文件
```

# 4 写文章

在 post 目录中，创建新文件，并以`markdown`语法填写内容，如：`vue_tip.md`

```md
## vue 要点梳理

1、基本概念

2、路由管理

3、状态管理
```

# 5 实践

1、下载项目，并安装依赖项

```bash
npm install
```

2、编译数据源

执行如下命令，将会根据 post 目录下内容，生成数据源文件，并放于 src/public/generate 目录下。

```bash
npm run generate
```

3、执行如下命令，进入开发模式

```bash
npm run start
```

4、执行如下命令，生成打包后的生产环境代码

```bash
npm run build
```
