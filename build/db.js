"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = _mongoose["default"].connection;
var handleOpen = function handleOpen() {
  return console.log("✔ DB is connected");
};
var handleError = function handleError(error) {
  return console.log("\u2716failed to connect DB, Error: ".concat(error));
};
db.on("error", handleError);
db.once("open", handleOpen);