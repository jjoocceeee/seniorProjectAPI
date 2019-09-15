import { schemaComposer } from 'graphql-compose';
import { StockTC, RatingTC } from './stock';
import { PriceTC } from './price';
import { WeightTC } from './weight';

schemaComposer.Query.addFields({
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
  pricePagination: PriceTC.getResolver('pagination'),

  weightById: WeightTC.getResolver('findById'),
  weightMany: WeightTC.getResolver('findMany'),
  getTwentyDayHigh: PriceTC.getResolver('checkTwentyDayHigh'),
  fourCandleHammer: PriceTC.getResolver('fourCandleHammer')
});

schemaComposer.Mutation.addFields({
  addStockToUniverse: StockTC.getResolver('createOne'),
  insertPrice: PriceTC.getResolver('createOne'),
  insertRating: RatingTC.getResolver('createOne'),
  insertWeight: WeightTC.getResolver('createOne')
});



const schema = schemaComposer.buildSchema();
export default schema;