const merge = require("webpack-merge");
const common = require("./webpack.base.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    // host: require("ip").address(),
    host: "0.0.0.0",
    port: 9090,
    contentBase: "./dist",
    historyApiFallback: true // 对于SPA调试非常有用，若不加将跳转失败
  }
});
