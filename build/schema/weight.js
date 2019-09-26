"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeightTC = void 0;

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
//# sourceMappingURL=weight.js.map