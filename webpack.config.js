var path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
var webpack = require("webpack");

module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: {
      EditControl: "./src/EditControl.ts",
    },
    devtool: "source-map",
    devServer: {
      devMiddleware: {
        publicPath: "/dist/",
      },
      static: {
        directory: "./",
        serveIndex: true,
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: argv.mode === "production" ? "[name].js" : "[name].max.js",
      libraryTarget: "umd",
    },
    externals: {
      babylonjs: {
        commonjs: "babylonjs",
        commonjs2: "babylonjs",
        amd: "babylonjs",
        root: "BABYLON",
      },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            nameCache: null,
            sourceMap: true, // Must be set to true if using source-maps in production
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            ecma: undefined,
            mangle: {
              // mangle options
              properties: {
                // mangle property options
                //mangle all variables starting with underscore "_"
                regex: /^_/,
              },
            },
          },
        }),
      ],
    },
  };
};
