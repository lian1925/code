const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/main.tsx"
  },

  output: {
    pathinfo: false,
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist/"),
    publicPath: "/"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".less"],
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      src: path.resolve(__dirname, "../src/")
    }
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([{ from: "src/public", to: "public" }]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,

        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
};
