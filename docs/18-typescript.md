## 简介

TypeScript 是 Javascript 的一个超集，支持变量强类型，有利于在大型项目中保持代码的可靠性。

另外，TypeScript 与编辑器 vs code 有着很好的契合度，两者配合，为开发者提供优秀的开发体验，包括：重构变量，跳转函数定义等功能。

## 实践

1、安装依赖包

```bash
npm install --save-dev typescript ts-loader awesome-typescript-loader source-map-loader
```

2、创建配置文件 tsconfig.json，添加内容

```js
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react"
  },
  "include": ["./src/**/*"],
  "exclude": ["node_modules"]
}
```

3、在配置文件 webpack.base.js，添加内容

```js
{
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "awesome-typescript-loader"
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ];
  }
}
```

## 结合 react

1、安装依赖包

```bash
npm install --save @types/react @types/react-dom
```

2、编写组件

```ts
// 函数写法
import * as React from "react";

interface IHomeProps {}

const IHome: React.FunctionComponent<IHomeProps> = props => {
  return;
};

export default IHome;

// 对象写法
import * as React from "react";

export interface HelloProps {}

export default class Hello extends React.Component<HelloProps, any> {
  public render() {
    return <div />;
  }
}
```

# 语法清单(附录)

```ts
// 基本类型
// 1 布尔
let isDone: boolean = false;

// 2 数值
let age: number = 18;

// 3 字符串
let name: string = "lian";
let stentence: string = `Hi, my name is ${name}`;

// 4 数组
let list: number[] = [1, 2];

// 5 元组
let person: [string, number] = ["lian", 18];

// 6 枚举
enum Color {
  Red,
  Blue
}
let color: Color = Color.Green;

// 7 任意
let temp: any = 3;

// 8 void，与any相反，表示空类型
function warning(): void {
  console.log("warning");
}

// 断言，类似于强制类型转换
let temp: any = "that";
let length: number = (temp as string).length;

// 变量声明，块作用域与函数作用域
// 变量与常量

// 解构
let [first, ...rest] = [1, 2, 3];
rest => [2, 3];

// 展开 与解构相反
// 接口
interface Square {
  color: string;
  width: number;
}
// 可选接口
interface Square {
  color?: string;
  width?: number;
}

// 只读接口
interface Square {
  readonly color: string;
  readonly width: number;
}

// 自由扩展接口
interface Square {
  color: string;
  width: number;
  [propName: string]: any;
}

// 继承接口
interface Circle extends Square {
  radius: number;
}

// 类型
class Greeter {
  constructor(msg: string) {
    this.msg = msg;
  }
  msg: string;
  greet() {
    console.log(`Hello, ${this.msg}`);
  }
}

// 函数
function add(x: number, y: number): number {
  return x + y;
}

// 泛型
function identify<T>(arg: T): T {
  return arg;
}
```
