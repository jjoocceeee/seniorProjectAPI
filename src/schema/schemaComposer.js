import { schemaComposer } from 'graphql-compose';
import { StockTC, PriceTC, RatingTC } from './stock';
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
  weightMany: WeightTC.getResolver('findMany')
});

schemaComposer.Mutation.addFields({
  addStockToUniverse: StockTC.getResolver('createOne'),
  insertPrice: PriceTC.getResolver('createOne'),
  insertRating: RatingTC.getResolver('createOne'),
  insertWeight: WeightTC.getResolver('createOne')
});

//TODO: Add stock price to a mutation.


const schema = schemaComposer.buildSchema();
export default schema;