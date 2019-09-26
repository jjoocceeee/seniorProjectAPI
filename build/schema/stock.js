"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RatingTC = exports.StockTC = void 0;

var _node = require("graphql-compose-mongoose/node8");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var StockSchema = new _mongoose["default"].Schema({
  ticker: {
    type: String,
    required: true,
    description: "Ticker ID for stock",
    index: true
  },
  name: {
    type: String,
    description: "Name of the stock.",
    required: true
  },
  IPO_date: {
    type: Date,
    description: "Date of IPO."
  }
});
var RatingSchema = new _mongoose["default"].Schema({
  type: {
    type: String,
    "enum": ['twoHundredDay', 'twitter', 'fourCandleHammer'],
    required: true,
    description: "Type of metric associated."
  },
  buy_rating: {
    type: Boolean,
    description: "Buy rating if true. Don't buy rating if false.",
    required: true
  },
  ticker: {
    type: String,
    requried: true,
    description: "Stock this metric is associated with.",
    index: true
  },
  date: {
    type: Date,
    description: "Date-Time this rating occurred.",
    required: true
  }
});

var Stock = _mongoose["default"].model('Stock', StockSchema);

var Rating = _mongoose["default"].model('Rating', RatingSchema); // STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES


var customizationOptions = {};
var StockTC = (0, _node.composeWithMongoose)(Stock, customizationOptions);
exports.StockTC = StockTC;
var RatingTC = (0, _node.composeWithMongoose)(Rating, customizationOptions); // TODO: Get 20 day high

exports.RatingTC = RatingTC;
//# sourceMappingURL=stock.js.map