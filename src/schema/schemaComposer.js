import { schemaComposer } from 'graphql-compose';
import { StockTC, RatingTC } from './stock';
import { PriceTC } from './price';
import { WeightTC } from './weight';
import { TweetTC } from './tweets';
import { AccountTC } from './alpaca';

schemaComposer.Query.addFields({
  stockOne: StockTC.getResolver('findOne'),
  stockMany: StockTC.getResolver('findMany'),
  stockCount: StockTC.getResolver('count'),
  stockPagination: StockTC.getResolver('pagination'),

  priceOne: PriceTC.getResolver('findOne'),
  priceMany: PriceTC.getResolver('findMany'),
  priceCount: PriceTC.getResolver('count'),
  pricePagination: PriceTC.getResolver('pagination'),

  weightMany: WeightTC.getResolver('findMany'),
  MostRecentWeight: WeightTC.getResolver('MostRecentWeight'),

  tweetMany: TweetTC.getResolver('findMany'),

  pricesUniverse: PriceTC.getResolver('pricesUniverse'),
  getTwentyDayHigh: PriceTC.getResolver('checkTwentyDayHigh'),
  fourCandleHammer: PriceTC.getResolver('fourCandleHammer'),

  getPositions: AccountTC.getResolver('getPositions'),
  recentTweets: TweetTC.getResolver('RecentTweetsByTicker'),
  RecentWeights: WeightTC.getResolver('RecentWeights'),
  AllWeightsTicker: WeightTC.getResolver('AllWeightsTicker')
  
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