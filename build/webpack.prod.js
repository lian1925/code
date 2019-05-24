const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.base.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");

console.log("webpack build env", process.env.NODE_ENV || "");

let prodConfig = merge(common, {
  mode: "production",
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),

    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          drop_console: false
        }
      }
    })
  ]
});
let gitpageConfig = merge(common, {
  mode: "production"
});

let config = process.env.NODE_ENV === "gitpage" ? gitpageConfig : prodConfig;

module.exports = config;
