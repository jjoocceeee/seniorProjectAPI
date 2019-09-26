"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PriceTC = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _node = require("graphql-compose-mongoose/node8");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _ = require('lodash');

var addDays = require('date-fns/addDays');

var differenceInDays = require('date-fns/differenceInDays');

var priceSchema = new _mongoose["default"].Schema({
  openPrice: {
    type: Number,
    description: "Opening Price of Stock.",
    required: true
  },
  closePrice: {
    type: Number,
    description: "Closing Price of Stock.",
    required: true
  },
  volume: {
    type: Number,
    description: "Volume of Stocks sold that day.",
    required: true
  },
  date: {
    type: Date,
    description: "Date-Time for this price.",
    required: true
  },
  ticker: {
    type: String,
    description: "Stock this price is associated with.",
    required: true,
    index: true
  }
});

var Price = _mongoose["default"].model('Price', priceSchema);

var customizationOptions = {};
var PriceTC = (0, _node.composeWithMongoose)(Price, customizationOptions);
exports.PriceTC = PriceTC;
PriceTC.addResolver({
  name: "checkTwentyDayHigh",
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
              return CheckTwentyDay(args.date).highCheck;

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
PriceTC.addResolver({
  name: "fourCandleHammer",
  type: "Boolean",
  args: {
    date: "Date!",
    ticker: "String!"
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref2) {
      var args, source, context, indexDate, twentyDayHighDate, twenty;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = _ref2.args, source = _ref2.source, context = _ref2.context;
              indexDate = new Date(args.date);
              twentyDayHighDate = new Date(addDays(indexDate, -24));
              _context2.next = 5;
              return CheckTwentyDay(twentyDayHighDate);

            case 5:
              twenty = _context2.sent;

              if (!twenty.highCheck) {
                _context2.next = 10;
                break;
              }

              _context2.next = 9;
              return checkPullBack(twenty.highPrice, -4, indexDate, args.ticker);

            case 9:
              return _context2.abrupt("return", _context2.sent);

            case 10:
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
/*
 * Check if there was a 20 day high followed by a 4 day pullback.
 * This method is commonly referred to as the Four Candle Hammer Algorithm.
 * Parameters:        prevhigh  =>  High $ to check to pullback against.
 *                    number    =>  number of days to check for a pullback. Default is 4.
 *                    date      =>  Date to check the four candle hammer around (will often be today).
 *                    ticker    =>  Ticker symbol for the stock.
 *
 */

function checkPullBack(_x3, _x4, _x5, _x6) {
  return _checkPullBack.apply(this, arguments);
}

function _checkPullBack() {
  _checkPullBack = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(prevhigh, number, date, ticker) {
    var amount, indexDate, pullbackDate, prices, high, check;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            amount = number || -4;
            indexDate = new Date(date);
            pullbackDate = new Date(addDays(indexDate, amount));
            _context3.next = 5;
            return Price.find({
              'date': {
                $lte: indexDate,
                $gt: pullbackDate
              },
              'ticker': ticker
            });

          case 5:
            prices = _context3.sent;
            high = prevhigh;
            check = true;

            _.forEach(prices, function (price) {
              if (price.openPrice > high) {
                check = false;
              }
            });

            return _context3.abrupt("return", check);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _checkPullBack.apply(this, arguments);
}

function CheckTwentyDay(_x7, _x8) {
  return _CheckTwentyDay.apply(this, arguments);
}

function _CheckTwentyDay() {
  _CheckTwentyDay = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(date, ticker) {
    var indexDate, twentyBefore, prices, high, highPriceDate;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            indexDate = new Date(date);
            twentyBefore = new Date(addDays(indexDate, -20));
            _context4.next = 4;
            return Price.find({
              'date': {
                $lte: indexDate,
                $gt: twentyBefore
              },
              'ticker': ticker
            });

          case 4:
            prices = _context4.sent;
            high = 0.0;
            highPriceDate = indexDate;

            _.forEach(prices, function (price) {
              if (price.closePrice > high) {
                high = price.closePrice;
                highPriceDate = price.date;
              }
            });

            if (!(differenceInDays(indexDate, highPriceDate) == 0)) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", {
              highCheck: true,
              highDate: highPriceDate,
              highPrice: high
            });

          case 12:
            return _context4.abrupt("return", {
              highCheck: false,
              highDate: highPriceDate,
              highPrice: high
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _CheckTwentyDay.apply(this, arguments);
}
//# sourceMappingURL=price.js.map