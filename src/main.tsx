import * as React from "react";

import * as ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "@/stores/reducers";

const store = createStore(rootReducer);
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
