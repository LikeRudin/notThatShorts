const MiniCssExtraPlugin = require("mini-css-extra-plugin");
const path = require("path");


const CLIENT_JS_PATH = ".src/client/js/";

module.exports = {
    entry: {
        main: CLIENT_JS_PATH + "layout/main.js",
        videoPlayer: CLIENT_JS_PATH + "videopage/videoPlayer.js",
        recorder: CLIENT_JS_PATH + "upload/recorder.js",
        commentSection: CLIENT_JS_PATH + "videopage/commentSection.js",
    },
}