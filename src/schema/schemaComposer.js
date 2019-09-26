import { schemaComposer } from 'graphql-compose';
import { StockTC, RatingTC } from './stock';
import { PriceTC } from './price';
import { WeightTC } from './weight';
import { TweetTC } from './tweets';

schemaComposer.Query.addFields({
  stockById: StockTC.getResolver('findById'),
  stockByIds: StockTC.getResolver('findByIds'),
  stockOne: StockTC.getResolver('findOne'),
  stockMany: StockTC.getResolver('findMany'),
  stockCount: StockTC.getResolver('count'),
  stockPagination: StockTC.getResolver('pagination'),

  priceById: PriceTC.getResolver('findById'),
  priceByIds: PriceTC.getResolver('findByIds'),
  priceOne: PriceTC.getResolver('findOne'),
  priceMany: PriceTC.getResolver('findMany'),
  priceCount: PriceTC.getResolver('count'),
  pricePagination: PriceTC.getResolver('pagination'),

  weightById: WeightTC.getResolver('findById'),
  weightMany: WeightTC.getResolver('findMany'),
  MostRecentWeight: WeightTC.getResolver('MostRecentWeight'),

  tweetById: TweetTC.getResolver('findById'),
  tweetMany: TweetTC.getResolver('findMany'),

  getTwentyDayHigh: PriceTC.getResolver('checkTwentyDayHigh'),
  fourCandleHammer: PriceTC.getResolver('fourCandleHammer'),
  
});

schemaComposer.Mutation.addFields({
  addStockToUniverse: StockTC.getResolver('createOne'),
  insertPrice: PriceTC.getResolver('createOne'),
  insertRating: RatingTC.getResolver('createOne'),
  insertWeight: WeightTC.getResolver('createOne'),
  insertTweet: TweetTC.getResolver('createOne')
});



const schema = schemaComposer.buildSchema();
export default schema;