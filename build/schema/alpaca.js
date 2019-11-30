"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortfolioTC = exports.AccountTC = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _node = require("graphql-compose-mongoose/node8");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var Alpaca = require('@alpacahq/alpaca-trade-api');

var subDays = require('date-fns/subDays');

var alpaca = new Alpaca({
  keyId: process.env.alpaca_api_key_id,
  secretKey: process.env.alpaca_api_secret_key,
  paper: true
});
var AccountSchema = new _mongoose["default"].Schema({
  value: {
    type: Number,
    description: "Wallet Value at end of day.",
    required: true
  },
  date: {
    type: Date,
    description: "Date Account object was updated."
  }
});
var PortfolioSchema = new _mongoose["default"].Schema({
  value: {
    type: Number,
    description: "Wallet Value at end of day.",
    required: true
  },
  date: {
    type: Date,
    description: "Date Account object was updated."
  },
  ticker: {
    type: String,
    description: "Ticker symbol "
  },
  qty: {
    type: Number,
    description: "Quantity of stocks owned"
  },
  change_today: {
    type: Number,
    description: "Change for today"
  },
  price: {
    type: Number,
    description: "Current Price of the stock"
  }
});

var Account = _mongoose["default"].model('Account', AccountSchema);

var Portfolio = _mongoose["default"].model('Portfolio', PortfolioSchema); // STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES


var customizationOptions = {};
var AccountTC = (0, _node.composeWithMongoose)(Account, customizationOptions);
exports.AccountTC = AccountTC;
var PortfolioTC = (0, _node.composeWithMongoose)(Portfolio, customizationOptions);
exports.PortfolioTC = PortfolioTC;
AccountTC.addResolver({
  name: "getPositions",
  type: "JSON",
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref) {
      var args, source, context, pos;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = _ref.args, source = _ref.source, context = _ref.context;
              _context.next = 3;
              return getPositions();

            case 3:
              pos = _context.sent;
              return _context.abrupt("return", pos);

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
AccountTC.addResolver({
  name: "getAccount",
  type: "JSON",
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref2) {
      var args, source, context, acc;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = _ref2.args, source = _ref2.source, context = _ref2.context;
              _context2.next = 3;
              return getAccount();

            case 3:
              acc = _context2.sent;
              return _context2.abrupt("return", acc);

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

function getPositions() {
  return _getPositions.apply(this, arguments);
}

function _getPositions() {
  _getPositions = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var pos;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return alpaca.getPositions();

          case 2:
            pos = _context3.sent;
            return _context3.abrupt("return", pos);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getPositions.apply(this, arguments);
}

function getAccount() {
  return _getAccount.apply(this, arguments);
}

function _getAccount() {
  _getAccount = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var acc;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return alpaca.getAccount();

          case 2:
            acc = _context4.sent;
            return _context4.abrupt("return", acc);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getAccount.apply(this, arguments);
}
//# sourceMappingURL=alpaca.js.map