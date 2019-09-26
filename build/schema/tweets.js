"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweetTC = void 0;

var _node = require("graphql-compose-mongoose/node8");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var TweetSchema = new _mongoose["default"].Schema({
  tweet: {
    type: String,
    required: true,
    description: "Tweet",
    index: true
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
//# sourceMappingURL=tweets.js.map