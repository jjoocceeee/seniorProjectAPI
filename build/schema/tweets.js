"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweetTC = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _node = require("graphql-compose-mongoose/node8");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var TweetSchema = new _mongoose["default"].Schema({
  tweet: {
    type: String,
    required: true,
    description: "Tweet",
    index: true,
    uppercase: true
  },
  rating: {
    type: Number,
    description: "Sentiment Score for Tweet",
    required: true
  },
  date: {
    type: Date,
    required: true,
    description: "Date Tweet was published."
  },
  company: {
    type: String,
    required: true,
    description: "Company that the tweet is about."
  }
});

var Tweet = _mongoose["default"].model('Tweet', TweetSchema); // STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES


var customizationOptions = {};
var TweetTC = (0, _node.composeWithMongoose)(Tweet, customizationOptions);
exports.TweetTC = TweetTC;
TweetTC.addResolver({
  name: "RecentTweetsByTicker",
  args: {
    ticker: "String!"
  },
  type: ["Tweet"],
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref) {
      var args, source, context, tweets;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = _ref.args, source = _ref.source, context = _ref.context;
              console.log("Args.ticker: ", args.ticker);
              _context.next = 4;
              return Tweet.find({
                company: args.ticker
              }).sort({
                date: -1
              }).limit(10);

            case 4:
              tweets = _context.sent;
              return _context.abrupt("return", tweets);

            case 6:
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
TweetTC.addResolver({
  name: "TweetCount",
  description: "Count of total tweets analyzed.",
  type: "Int",
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref2) {
      var args, source, context;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = _ref2.args, source = _ref2.source, context = _ref2.context;
              _context2.next = 3;
              return Tweet.count();

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
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
//# sourceMappingURL=tweets.js.map