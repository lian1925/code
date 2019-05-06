const path = require("path");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const vendor = [
  "react",
  "react-dom",
  "react-router-dom",
  "rc-queue-anim",
  "markdown-it",
  "highlight.js",
  "antd",
  "redux",
  "redux-starter-kit"
];

module.exports = {
  mode: "production",
  entry: {
    dll: vendor
  },
  output: {
    path: path.join(__dirname, "dll"),
    filename: "[name].js",
    library: "_dll_[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.join(__dirname, "dll", "manifest.json")
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    })
  ]
};
