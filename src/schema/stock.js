import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';

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
const Rating = mongoose.model('Rating', RatingSchema);



// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {};
const StockTC = composeWithMongoose(Stock, customizationOptions);

const RatingTC = composeWithMongoose(Rating, customizationOptions);


export { StockTC, RatingTC };



// TODO: Get 20 day high