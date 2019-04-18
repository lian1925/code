const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.base.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      },
      sourceMap: true
    })
  ]
});
