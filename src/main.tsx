// react 相关
import * as React from "react";
import * as ReactDom from "react-dom";

// redux 相关
import { Provider } from "react-redux";
import { createStore } from "redux";
import { configureStore } from "redux-starter-kit";

// 页面相关
import App from "./App";
import rootReducer from "@/stores/reducers";

const store = configureStore({
  reducer: rootReducer
});

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
