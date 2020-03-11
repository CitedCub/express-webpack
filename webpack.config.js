const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/env", "@babel/react"]
    }
  }
};

const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    server: path.resolve(__dirname, "server.js")
  },
  module: {
    rules: [js]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  }
};

const clientConfig = {
  mode: "development",
  target: "web",
  entry: {
    client: path.resolve(__dirname, "src/index.js")
  },
  module: {
    rules: [js]
  },
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "../index.html",
      excludeChunks: ["server"]
    })
  ]
};

module.exports = [serverConfig, clientConfig];
