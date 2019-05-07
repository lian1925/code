const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { SkeletonPlugin } = require("page-skeleton-webpack-plugin");

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

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        use: [
          { loader: "cache-loader" },
          {
            loader: "thread-loader",
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require("os").cpus().length - 1,
              poolTimeout: Infinity // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false,
              experimentalWatchApi: true,
              happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            }
          }
        ]
      },
      {
        test: /\.css$/,
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
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "dll"),
      manifest: require("./dll/manifest.json")
    }),
    // new ForkTsCheckerWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([{ from: "src/public", to: "public" }]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: true
    })
  ],
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
