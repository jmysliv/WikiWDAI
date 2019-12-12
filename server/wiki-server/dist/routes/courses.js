"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// routes/courses.js
var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  res.status(200).json({
    message: "You requested to get courses"
  });
});
router.post('/', function (req, res, next) {
  res.status(201).json({
    message: "You requested to post course"
  });
}); //handling request with specified id(get, patch, delete)

router.get('/:courseid', function (req, res, next) {
  var id = req.params.id;
  res.status(200).json({
    message: "You requested to get course",
    id: id
  });
});
router.put('/:courseid', function (req, res, next) {
  var id = req.params.id;
  res.status(200).json({
    message: "You requested to put course",
    id: id
  });
});
router["delete"]('/:courseid', function (req, res, next) {
  var id = req.params.id;
  res.status(200).json({
    message: "You requested to delete course",
    id: id
  });
});
var _default = router;
exports["default"] = _default;