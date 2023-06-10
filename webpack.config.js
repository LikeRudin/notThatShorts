const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");


const CLIENT_JS_PATH = "./src/client/js/";

module.exports = {
    entry: {
        main: CLIENT_JS_PATH + "main.js",
        videoPlayer: CLIENT_JS_PATH + "videopage/videoPlayer.js",
        commentSection: CLIENT_JS_PATH + "videopage/commentSection.js",
    },
     plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};