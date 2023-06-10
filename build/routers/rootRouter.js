"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _middlewares = require("../middlewares");
var _userController = require("../controllers/userController");
var _videoController = require("../controllers/videoController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rootRouter = _express["default"].Router();
rootRouter.get("/", _videoController.getHome);
rootRouter.get("/search", _videoController.search);
rootRouter.route("/login").all(_middlewares.publicOnlyMiddleware).get(_userController.getLogin).post(_userController.postLogin);
rootRouter.route("/join").all(_middlewares.publicOnlyMiddleware).get(_userController.getJoin).post(_userController.postJoin);
var _default = rootRouter;
exports["default"] = _default;