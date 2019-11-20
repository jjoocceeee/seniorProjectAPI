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

var _universe = _interopRequireDefault(require("../universe"));

var moment = require('moment-business-days');

var momentTZ = require('moment-timezone'); // import { addHours } from 'date-fns/esm';


var _ = require('lodash');

var addDays = require('date-fns/addDays');

var differenceInDays = require('date-fns/differenceInDays');

var subDays = require('date-fns/subDays');

var format = require('date-fns/format');

moment.updateLocale('us', {
  workingWeekdays: [1, 2, 3, 4, 5]
});
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
    required: true,
    index: true
  },
  ticker: {
    type: String,
    description: "Stock this price is associated with.",
    required: true,
    index: true
  },
  bull: {
    type: Boolean,
    desctption: "Whether or not the stock is up from the previous day."
  }
});
priceSchema.post('save',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  var prev, yestPrice;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          prev = momentTZ(this.date).tz("America/Phoenix").prevBusinessDay().format('YYYY-MM-DD') + "T00:00:00.000Z";
          console.log("Previous: ", prev);
          _context.next = 4;
          return Price.findOne({
            'date': prev,
            'ticker': this.ticker
          });

        case 4:
          yestPrice = _context.sent;

          if (yestPrice) {
            this.bull = prev.closePrice < this.openPrice;
          }

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));

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
    _regenerator["default"].mark(function _callee2(_ref2) {
      var args, source, context;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = _ref2.args, source = _ref2.source, context = _ref2.context;
              _context2.next = 3;
              return CheckTwentyDay(args.date).highCheck;

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function resolve(_x) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
});
PriceTC.addResolver({
  name: "UpdateBull",
  type: "Boolean",
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(_ref3) {
      var args, source, context, prev, prices1;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              args = _ref3.args, source = _ref3.source, context = _ref3.context;
              prev = momentTZ(new Date()).tz("America/Phoenix").prevBusinessDay().format('YYYY-MM-DD') + "T00:00:00.000Z";
              _context3.next = 4;
              return Price.findOne({
                'date': prev,
                'ticker': args.ticker
              });

            case 4:
              prices1 = _context3.sent;

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function resolve(_x2) {
      return _resolve2.apply(this, arguments);
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
    var _resolve3 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(_ref4) {
      var args, source, context, indexDate, twentyDayHighDate, twenty;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              args = _ref4.args, source = _ref4.source, context = _ref4.context;
              indexDate = new Date(args.date);
              twentyDayHighDate = new Date(addDays(indexDate, -24));
              _context4.next = 5;
              return CheckTwentyDay(twentyDayHighDate);

            case 5:
              twenty = _context4.sent;

              if (!twenty.highCheck) {
                _context4.next = 10;
                break;
              }

              _context4.next = 9;
              return checkPullBack(twenty.highPrice, -4, indexDate, args.ticker);

            case 9:
              return _context4.abrupt("return", _context4.sent);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function resolve(_x3) {
      return _resolve3.apply(this, arguments);
    }

    return resolve;
  }()
}); //Get the price for today for each product 

PriceTC.addResolver({
  name: "pricesUniverse",
  type: ["Price"],
  resolve: function () {
    var _resolve4 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(_ref5) {
      var args, source, context, indexDate;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              args = _ref5.args, source = _ref5.source, context = _ref5.context;
              indexDate = format(subDays(new Date(), 1), 'yyyy-MM-dd') + "T00:00:00.000Z";
              _context5.next = 4;
              return Price.find({
                'ticker': {
                  $in: _.map(_universe["default"].universe, 'ticker')
                },
                'date': indexDate
              }).sort({
                date: -1
              });

            case 4:
              return _context5.abrupt("return", _context5.sent);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function resolve(_x4) {
      return _resolve4.apply(this, arguments);
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

function checkPullBack(_x5, _x6, _x7, _x8) {
  return _checkPullBack.apply(this, arguments);
}

function _checkPullBack() {
  _checkPullBack = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(prevhigh, number, date, ticker) {
    var amount, indexDate, pullbackDate, prices, high, check;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            amount = number || -4;
            indexDate = new Date(date);
            pullbackDate = new Date(addDays(indexDate, amount));
            _context6.next = 5;
            return Price.find({
              'date': {
                $lte: indexDate,
                $gt: pullbackDate
              },
              'ticker': ticker
            });

          case 5:
            prices = _context6.sent;
            high = prevhigh;
            check = true;

            _.forEach(prices, function (price) {
              if (price.openPrice > high) {
                check = false;
              }
            });

            return _context6.abrupt("return", check);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _checkPullBack.apply(this, arguments);
}

function CheckTwentyDay(_x9, _x10) {
  return _CheckTwentyDay.apply(this, arguments);
}

function _CheckTwentyDay() {
  _CheckTwentyDay = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(date, ticker) {
    var indexDate, twentyBefore, prices, high, highPriceDate;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            indexDate = new Date(date);
            twentyBefore = new Date(addDays(indexDate, -20));
            _context7.next = 4;
            return Price.find({
              'date': {
                $lte: indexDate,
                $gt: twentyBefore
              },
              'ticker': ticker
            });

          case 4:
            prices = _context7.sent;
            high = 0.0;
            highPriceDate = indexDate;

            _.forEach(prices, function (price) {
              if (price.closePrice > high) {
                high = price.closePrice;
                highPriceDate = price.date;
              }
            });

            if (!(differenceInDays(indexDate, highPriceDate) == 0)) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", {
              highCheck: true,
              highDate: highPriceDate,
              highPrice: high
            });

          case 12:
            return _context7.abrupt("return", {
              highCheck: false,
              highDate: highPriceDate,
              highPrice: high
            });

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _CheckTwentyDay.apply(this, arguments);
}
//# sourceMappingURL=price.js.map