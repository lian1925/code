// react 相关
import * as React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

// style 相关
import "src/style/index.less";

// router 相关
import Index from "src/views/index";
import Post from "src/views/post";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/post" component={Post} />
    </Switch>
  </Router>
);

export default App;
