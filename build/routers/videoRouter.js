"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _middlewares = require("../middlewares");
var _videoController = require("../controllers/videoController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videoRouter = _express["default"].Router();

//upload, edit, delete

// "/:id([0-9a-f]{24})"
videoRouter.get("/:id([0-9a-f]{24})", _videoController.watchVideo);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middlewares.protectorMiddleware).get(_videoController.getVideoEdit).post(_videoController.postVideoEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(_middlewares.protectorMiddleware).get(_videoController.deleteVideo);
videoRouter.route("/upload").all(_middlewares.protectorMiddleware).get(_videoController.getUploadVideo).post(_middlewares.videoUpload.fields([{
  name: "video"
}, {
  name: "thumb"
}]), _videoController.postUploadVideo);
var _default = videoRouter;
exports["default"] = _default;