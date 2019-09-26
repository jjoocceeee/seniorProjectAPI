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
  movingWeigth: {
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
    required: true
  }
});

var Weight = _mongoose["default"].model('Weight', weightSchema);

var customizationOptions = {};
var WeightTC = (0, _node.composeWithMongoose)(Weight, customizationOptions);
exports.WeightTC = WeightTC;
WeightTC.addResolver({
  name: "MostRecentWeight",
  type: "Boolean",
  args: {
    date: "Date!",
    ticker: "String!"
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref) {
      var args, source, context;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = _ref.args, source = _ref.source, context = _ref.context;
              _context.next = 3;
              return Weight.find({
                'ticker': ticker
              }).sort({
                _id: -1
              });

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
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
//# sourceMappingURL=weight.js.map