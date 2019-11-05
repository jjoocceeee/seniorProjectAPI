"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlCompose = require("graphql-compose");

var _stock = require("./stock");

var _price = require("./price");

var _weight = require("./weight");

var _tweets = require("./tweets");

_graphqlCompose.schemaComposer.Query.addFields({
  stockOne: _stock.StockTC.getResolver('findOne'),
  stockMany: _stock.StockTC.getResolver('findMany'),
  stockCount: _stock.StockTC.getResolver('count'),
  stockPagination: _stock.StockTC.getResolver('pagination'),
  priceOne: _price.PriceTC.getResolver('findOne'),
  priceMany: _price.PriceTC.getResolver('findMany'),
  priceCount: _price.PriceTC.getResolver('count'),
  pricePagination: _price.PriceTC.getResolver('pagination'),
  weightMany: _weight.WeightTC.getResolver('findMany'),
  MostRecentWeight: _weight.WeightTC.getResolver('MostRecentWeight'),
  tweetMany: _tweets.TweetTC.getResolver('findMany'),
  pricesUniverse: _price.PriceTC.getResolver('pricesUniverse'),
  getTwentyDayHigh: _price.PriceTC.getResolver('checkTwentyDayHigh'),
  fourCandleHammer: _price.PriceTC.getResolver('fourCandleHammer')
});

_graphqlCompose.schemaComposer.Mutation.addFields({
  addStockToUniverse: _stock.StockTC.getResolver('createOne'),
  insertPrice: _price.PriceTC.getResolver('createOne'),
  insertRating: _stock.RatingTC.getResolver('createOne'),
  insertWeight: _weight.WeightTC.getResolver('createOne'),
  insertTweet: _tweets.TweetTC.getResolver('createOne')
});

var schema = _graphqlCompose.schemaComposer.buildSchema();

var _default = schema;
exports["default"] = _default;
//# sourceMappingURL=schemaComposer.js.map