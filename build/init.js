"use strict";

require("regenerator-runtime");
require("dotenv/config");
require("./db");
require("./models/Video");
require("./models/User");
require("./models/Comment");
var _server = _interopRequireDefault(require("./server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = 8000;
var handleListening = function handleListening() {
  return console.log("Server is listening from http://localhost:".concat(PORT, "\uD83D\uDC7B"));
};
_server["default"].listen(PORT, handleListening);