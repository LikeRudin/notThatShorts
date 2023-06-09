"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchVideo = exports.uploadComment = exports.search = exports.registerView = exports.postVideoEdit = exports.postUploadVideo = exports.getVideoEdit = exports.getUploadVideo = exports.getHome = exports.deleteVideo = exports.deleteComment = void 0;
var _Video = _interopRequireDefault(require("../models/Video"));
var _User = _interopRequireDefault(require("../models/User"));
var _Comment = _interopRequireDefault(require("../models/Comment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//for RootRouter

/**render home */
var getHome = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var videos;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("get Home is running");
          _context.next = 3;
          return _Video["default"].find({}).sort({
            createdAt: "desc"
          });
        case 3:
          videos = _context.sent;
          return _context.abrupt("return", res.render("home", {
            pageTitle: "Home",
            videos: videos
          }));
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getHome(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**handle get search and render search*/
exports.getHome = getHome;
var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var keyword, videos;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("search is running");
          keyword = req.query.keyword;
          videos = [];
          if (!keyword) {
            _context2.next = 7;
            break;
          }
          _context2.next = 6;
          return _Video["default"].find({
            title: {
              $regex: new RegExp("".concat(keyword), "i")
            }
          }).populate("owner");
        case 6:
          videos = _context2.sent;
        case 7:
          return _context2.abrupt("return", res.render("search", {
            pageTitle: "Search",
            videos: videos
          }));
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//for videoRouter

/**
 * videoid : req.params
 * userid: req.session
 * 
 * etc: req.body
 */
exports.search = search;
var getVideoEdit = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var videoId, userId, video;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log("getVideoEdit is running");
          videoId = req.params.id;
          userId = req.session.user._id;
          _context3.next = 5;
          return _Video["default"].findById(videoId);
        case 5:
          video = _context3.sent;
          if (video) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(404).render("404", {
            pageTitle: 'video not found'
          }));
        case 8:
          if (!(String(video.owner) !== String(userId))) {
            _context3.next = 11;
            break;
          }
          req.flash("error", "authorized video owner only");
          return _context3.abrupt("return", res.status(403).redirect("/"));
        case 11:
          return _context3.abrupt("return", res.render("edit-video", {
            pageTitle: "Edit ".concat(video.title),
            video: video
          }));
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getVideoEdit(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getVideoEdit = getVideoEdit;
var postVideoEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var videoId, userId, _req$body, title, description, hashtags, video;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          console.log("postVideoEdit is running");
          videoId = req.params.id;
          userId = req.session.user._id;
          _req$body = req.body, title = _req$body.title, description = _req$body.description, hashtags = _req$body.hashtags;
          _context4.next = 6;
          return _Video["default"].findById(videoId);
        case 6:
          video = _context4.sent;
          if (video) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).render("404", {
            pageTitle: 'video not found'
          }));
        case 9:
          if (!(String(video.owner) !== String(userId))) {
            _context4.next = 12;
            break;
          }
          req.flash("error", "authorized for only video uploader");
          return _context4.abrupt("return", res.status(403).redirect("/"));
        case 12:
          _context4.next = 14;
          return _Video["default"].findByIdAndUpdate(videoId, {
            title: title,
            description: description,
            hashtags: hashtags
          });
        case 14:
          req.flash("success", "successfully updated video data");
          res.redirect("/videos/".concat(videoId));
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function postVideoEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.postVideoEdit = postVideoEdit;
var getUploadVideo = function getUploadVideo(req, res) {
  console.log("getUploadVideo is running");
  return res.render("upload", {
    pageTitle: "Upload Video"
  });
};
exports.getUploadVideo = getUploadVideo;
var postUploadVideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$files, video, thumb, _req$body2, title, description, hashtags, userId, newVideo, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.log("postUploadVideo is running");
          _req$files = req.files, video = _req$files.video, thumb = _req$files.thumb;
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, hashtags = _req$body2.hashtags;
          userId = req.session.user._id;
          console.log("this is video path: ".concat(video[0].path));
          _context5.prev = 5;
          _context5.next = 8;
          return _Video["default"].create({
            title: title,
            description: description,
            fileUrl: video[0].path,
            thumbUrl: thumb[0].path,
            hashtags: _Video["default"].formatHashtags(hashtags),
            owner: userId
          });
        case 8:
          newVideo = _context5.sent;
          _context5.next = 11;
          return _User["default"].findById(userId);
        case 11:
          user = _context5.sent;
          user.videos.push(newVideo._id);
          user.save();
          return _context5.abrupt("return", res.redirect("/"));
        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](5);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: _context5.t0._message
          }));
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[5, 17]]);
  }));
  return function postUploadVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.postUploadVideo = postUploadVideo;
var deleteVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var videoId, userId, video;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          console.log("deleteVideo is running");
          videoId = req.params.id;
          userId = req.session.user._id;
          _context6.next = 5;
          return _Video["default"].findById(videoId);
        case 5:
          video = _context6.sent;
          if (video) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.status(404).render("404", {
            pageTitle: "Video not found"
          }));
        case 8:
          if (!(String(video.owner) !== String(userId))) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.status(404).redirect("/"));
        case 10:
          _context6.prev = 10;
          _context6.next = 13;
          return _Video["default"].findByIdAndDelete(videoId);
        case 13:
          req.flash("success", "Video is succefully deleted");
          return _context6.abrupt("return", res.redirect("/"));
        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](10);
          req.flash("error", "video is not deleted");
          return _context6.abrupt("return", res.redirect("/"));
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[10, 17]]);
  }));
  return function deleteVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteVideo = deleteVideo;
var watchVideo = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var videoId, video;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          console.log("watchVideo is running");
          videoId = req.params.id;
          _context7.next = 4;
          return _Video["default"].findById(videoId).populate("owner").populate("comments");
        case 4:
          video = _context7.sent;
          if (video) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.render("404", {
            pageTitle: "Video not found"
          }));
        case 7:
          return _context7.abrupt("return", res.render("video-page", {
            pageTitle: "".concat(video.title),
            video: video
          }));
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function watchVideo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

//for api Router
exports.watchVideo = watchVideo;
var registerView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var videoId, video;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          console.log("registerView is running");
          videoId = req.params.id;
          _context8.next = 4;
          return _Video["default"].findById(videoId);
        case 4:
          video = _context8.sent;
          if (video) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.sendStatus(404));
        case 7:
          video.meta.views = video.meta.views + 1;
          _context8.prev = 8;
          _context8.next = 11;
          return video.save();
        case 11:
          return _context8.abrupt("return", res.sendStatus(200));
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](8);
          console.log("upload meta is failed");
          return _context8.abrupt("return", res.sendStatus(400));
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[8, 14]]);
  }));
  return function registerView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.registerView = registerView;
var uploadComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var userId, text, videoId, video, user, comment;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          console.log("uploadComment is running");
          userId = req.session.user._id;
          text = req.body.text;
          videoId = req.params.id;
          _context9.next = 6;
          return _Video["default"].findById(videoId);
        case 6:
          video = _context9.sent;
          if (video) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", res.sendStatus(404));
        case 9:
          _context9.next = 11;
          return _User["default"].findById(userId);
        case 11:
          user = _context9.sent;
          if (user) {
            _context9.next = 14;
            break;
          }
          return _context9.abrupt("return", res.sendStatus(404));
        case 14:
          _context9.next = 16;
          return _Comment["default"].create({
            text: text,
            owner: userId,
            video: videoId
          });
        case 16:
          comment = _context9.sent;
          video.comments.push(comment._id);
          _context9.next = 20;
          return video.save();
        case 20:
          user.comments.push(comment._id);
          _context9.next = 23;
          return user.save();
        case 23:
          return _context9.abrupt("return", res.status(201).json({
            newCommentId: comment._id
          }));
        case 24:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function uploadComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.uploadComment = uploadComment;
var deleteComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var userId, commentId, videoId, video, user;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          console.log("deleteComment is running");
          userId = req.session.user._id;
          commentId = req.body.commentId;
          videoId = req.params.id;
          _context10.next = 6;
          return _Video["default"].findById(videoId);
        case 6:
          video = _context10.sent;
          if (video) {
            _context10.next = 10;
            break;
          }
          console.log("delete comment failed, video not found");
          return _context10.abrupt("return", res.sendStatus(404));
        case 10:
          video.comments = video.comments.filter(function (id) {
            return id !== commentId;
          });
          _context10.next = 13;
          return video.save();
        case 13:
          _context10.next = 15;
          return _User["default"].findById(userId);
        case 15:
          user = _context10.sent;
          if (user) {
            _context10.next = 19;
            break;
          }
          console.log("delete comment failed, user not found");
          return _context10.abrupt("return", res.sendStatus(404));
        case 19:
          user.comments = user.comments.filter(function (id) {
            return id !== commentId;
          });
          _context10.next = 22;
          return user.save();
        case 22:
          _context10.prev = 22;
          _context10.next = 25;
          return _Comment["default"].findByIdAndDelete(commentId);
        case 25:
          return _context10.abrupt("return", res.sendStatus(200));
        case 28:
          _context10.prev = 28;
          _context10.t0 = _context10["catch"](22);
          console.log("delete comment failed, Comment not found");
          return _context10.abrupt("return", res.sendStatus(400));
        case 32:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[22, 28]]);
  }));
  return function deleteComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.deleteComment = deleteComment;