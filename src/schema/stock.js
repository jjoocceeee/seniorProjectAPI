import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';



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


export { StockTC, PriceTC, RatingTC };