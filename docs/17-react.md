# 简介

react 是一个用于构建用户界面的 JavaScript 库。它拥有两大特性：
1、以声明式编写 ui，让 ui 代码更加可靠且方便调试。
2、以 JavaScript 编写组件，实现应用状态与 dom 代码的友好分离。

## jsx

## react-router

1、安装依赖包

```bash
npm i --save-dev react-router-dom

```

2、使用

```ts
// HashRouter | BrowserRouter
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function LinkToHome() {
  return <Link to="/home/">Home</Link>;
}

function router() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />

        <Route path="/article" component={Index} />
      </div>
    </Router>
  );
}
```

## 打包优化之分割

1、安装依赖包

```bash
npm install --save-dev @babel/plugin-syntax-dynamic-import

npm install --save @loadable/component
```

2、在配置文件 babel.config.js,添加内容

```js
{
  "plugins":["@babel/plugin-syntax-dynamic-import"]
}
```

3、在路由文件 App.tsx 上，添加内容

```js
import loadable from "@loadable/component";

const Home = loadable(() => import("@/views/Home"), {
  fallback: <div>loading...</div>
});
```

## 实践

1、安装依赖包

```bash
npm install --save react react-dom react-router-dom

# 安装类型声明文件
npm install --save-dev @types/react
```

2、创建入口文件 main.tsx，添加内容

```tsx
import * as React from "react";

import * as ReactDom from "react-dom";
import App from "./App";

ReactDom.render(<App />, document.getElementById("root"));
```

3、创建路由文件 App.tsx，添加内容

```tsx
import * as React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./views/home";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;
```

4、添加容器组件 /viesws/home.tsx, 添加内容

```tsx
import * as React from "react";

export default class IApp extends React.Component<IAppProps, any> {
  public render() {
    return <div>Hello world!</div>;
  }
}
```
