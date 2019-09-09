"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _node = require("graphql-compose-mongoose/node8");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _graphqlCompose = require("graphql-compose");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
  // type: {
  //   type: String,
  //   enum: [ 'open', 'close', 'interday', 'afterhours' ],
  //   required: true
  // },
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

var Price = _mongoose["default"].model('Price', priceSchema);

var Rating = _mongoose["default"].model('Rating', RatingSchema); // STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES


var customizationOptions = {};
var StockTC = (0, _node.composeWithMongoose)(Stock, customizationOptions);
var PriceTC = (0, _node.composeWithMongoose)(Price, customizationOptions);
var RatingTC = (0, _node.composeWithMongoose)(Rating, customizationOptions); // STEP 3: Add needed CRUD User operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing

_graphqlCompose.schemaComposer.Query.addFields({
  stockById: StockTC.getResolver('findById'),
  stockByIds: StockTC.getResolver('findByIds'),
  stockOne: StockTC.getResolver('findOne'),
  stockMany: StockTC.getResolver('findMany'),
  stockCount: StockTC.getResolver('count'),
  stockConnection: StockTC.getResolver('connection'),
  stockPagination: StockTC.getResolver('pagination'),
  priceById: PriceTC.getResolver('findById'),
  priceByIds: PriceTC.getResolver('findByIds'),
  priceOne: PriceTC.getResolver('findOne'),
  priceMany: PriceTC.getResolver('findMany'),
  priceCount: PriceTC.getResolver('count'),
  priceConnection: PriceTC.getResolver('connection'),
  pricePagination: PriceTC.getResolver('pagination')
});

_graphqlCompose.schemaComposer.Mutation.addFields({
  addStockToUniverse: StockTC.getResolver('createOne'),
  insertPrice: PriceTC.getResolver('createOne'),
  insertRating: RatingTC.getResolver('createOne')
}); //TODO: Add stock price to a mutation.


var schema = _graphqlCompose.schemaComposer.buildSchema();

var _default = schema;
exports["default"] = _default;
//# sourceMappingURL=stock.js.map