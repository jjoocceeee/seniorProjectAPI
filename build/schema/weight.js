"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeightTC = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _node = require("graphql-compose-mongoose/node8");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _graphqlCompose = require("graphql-compose");

var _lodash = _interopRequireDefault(require("lodash"));

var weightSchema = new _mongoose["default"].Schema({
  ticker: {
    type: String,
    descpription: "Ticker the weight belongs to",
    required: true
  },
  twitterWeight: {
    type: Number,
    description: "Twitter weight",
    required: true
  },
  fourWeight: {
    type: Number,
    description: "Four Candle Hammer Weight",
    required: true
  },
  profitWeight: {
    type: Number,
    description: "Profit Loss Ratio Weight",
    required: true
  },
  movingWeight: {
    type: Number,
    description: "20-day Moving Average Weight",
    required: true
  },
  companyWeight: {
    type: Number,
    description: "Company Metric Weight",
    required: true
  },
  date: {
    type: Date,
    description: "Date-Time for this price.",
    required: true,
    index: true
  }
});

var Weight = _mongoose["default"].model('Weight', weightSchema);

var customizationOptions = {};
var WeightTC = (0, _node.composeWithMongoose)(Weight, customizationOptions);
exports.WeightTC = WeightTC;
WeightTC.addResolver({
  name: "RecentWeights",
  description: "Will provide recents weights for the ticker. The number of weights is determined by the count argument.",
  args: {
    count: "Int!",
    ticker: "String!"
  },
  type: ["Weight"],
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref) {
      var args, source, context, weights;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = _ref.args, source = _ref.source, context = _ref.context;
              _context.next = 3;
              return Weight.find({
                'ticker': args.ticker
              }).sort({
                date: -1
              }).limit(args.count);

            case 3:
              weights = _context.sent;
              return _context.abrupt("return", weights);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function resolve(_x) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
});
WeightTC.addResolver({
  name: "MostRecentWeight",
  description: "Provides the most recent weight.",
  type: "Weight",
  args: {
    ticker: "String!"
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref2) {
      var args, source, context, response;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = _ref2.args, source = _ref2.source, context = _ref2.context;
              _context2.next = 3;
              return Weight.find({
                'ticker': args.ticker
              }).sort({
                _id: -1
              });

            case 3:
              response = _context2.sent;
              return _context2.abrupt("return", response[0]);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function resolve(_x2) {
      return _resolve2.apply(this, arguments);
    }

    return resolve;
  }()
});
WeightTC.addResolver({
  name: "AllWeightsTicker",
  type: ["Weight"],
  args: {
    ticker: "String!"
  },
  resolve: function () {
    var _resolve3 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(_ref3) {
      var args, source, context, response;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              args = _ref3.args, source = _ref3.source, context = _ref3.context;
              _context3.next = 3;
              return Weight.find({
                'ticker': args.ticker
              }).sort({
                _id: -1
              });

            case 3:
              response = _context3.sent;
              return _context3.abrupt("return", response);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function resolve(_x3) {
      return _resolve3.apply(this, arguments);
    }

    return resolve;
  }()
});
WeightTC.addResolver({
  name: "WeightCount",
  description: "Count of total weights in ML algorithm.",
  type: "Int",
  resolve: function () {
    var _resolve4 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(_ref4) {
      var args, source, context;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              args = _ref4.args, source = _ref4.source, context = _ref4.context;
              _context4.next = 3;
              return Weight.count();

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function resolve(_x4) {
      return _resolve4.apply(this, arguments);
    }

    return resolve;
  }()
});
//# sourceMappingURL=weight.js.map