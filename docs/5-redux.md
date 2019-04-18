# 简介

redux 是一个 JavaScript 状态容器，致力于提供最简化的 API，且同时做到行为可预测。
redux 包括三大核心功能：action，reducer，store。

## action

action，本质是普通的 JavaScript 对象，用于描述状态的变更。

```js
// 示例
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  };
}
```

## reducer

reducer，本质是没有副作用的纯函数。它会根据 actions 表述，更新 state。

```js
// 示例
function todo(state = init, action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      });
  }
}
```

## store

store，本质是存储程序应用状态的仓库，主要职责如下：
1、维持应用的 state
2、提供 getState()方法获取 state
3、提供 dispatch(action)方法更新 state
4、提供 subscribe(listener)注册监听器

## 实践

1、安装依赖包

```bash
npm install --save redux react-redux @types/react-redux
npm install --save-dev redux-devtools
```

2、创建入口文件 main.js，填写内容

```js

// 入口
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './store/reducers'

const store = createStore(rootReducer)

render (
  <Provider store={store}>
    <APP/>
  </Provider>,document.getElementById('root)
)
```

# 结构

```ts
store =>  dispatch | subscribe | getState
action => {type:'ADD',payload:1}
reducer = (preState,action)=> state

```

# 相关对象

```ts
import { createStore } from "redux";

const store = createStore(rootReducer);
store => dispatch | subscribe | getState;

const reducer = combineReducers({ todos: [] });
```

# 代码

```js


store =>

// api
export function getOrderList(params: Prarams){
  return request({
    url: "/orders",
    method:"get",
    data: params
  })
}


```
