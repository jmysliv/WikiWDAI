"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //handling get, post and delete request


router.get('/', function (req, res, next) {
  res.status(200).json({
    message: "You requested to get users"
  });
});
router.post('/', function (req, res, next) {
  res.status(201).json({
    message: "You requested to post users"
  });
}); //handling request with specified id(get, patch, delete)

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  res.status(200).json({
    message: "You requested to get user",
    id: id
  });
});
router.put('/:id', function (req, res, next) {
  var id = req.params.id;
  res.status(200).json({
    message: "You requested to put user",
    id: id
  });
});
router["delete"]('/:id', function (req, res, next) {
  var id = req.params.id;
  res.status(200).json({
    message: "You requested to delete user",
    id: id
  });
});
var _default = router;
exports["default"] = _default;