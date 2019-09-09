import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';
import { schemaComposer } from 'graphql-compose';


const priceSchema = new mongoose.Schema({
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
    index:true
  }
});


const StockSchema = new mongoose.Schema({
  ticker:{
    type:String,
    required: true,
    description: "Ticker ID for stock",
    index:true
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


const RatingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [ 'twoHundredDay', 'twitter', 'fourCandleHammer'],
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
    index:true
  },
  date: {
    type: Date,
    description: "Date-Time this rating occurred.",
    required: true
  }
});


const Stock = mongoose.model('Stock', StockSchema);
const Price = mongoose.model('Price', priceSchema);
const Rating = mongoose.model('Rating', RatingSchema);



// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {};
const StockTC = composeWithMongoose(Stock, customizationOptions);
const PriceTC = composeWithMongoose(Price, customizationOptions);
const RatingTC = composeWithMongoose(Rating, customizationOptions);



// STEP 3: Add needed CRUD User operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing
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
});

schemaComposer.Mutation.addFields({
  addStockToUniverse: StockTC.getResolver('createOne'),
  insertPrice: PriceTC.getResolver('createOne'),
  insertRating: RatingTC.getResolver('createOne'),
});

//TODO: Add stock price to a mutation.


const schema = schemaComposer.buildSchema();
export default schema;