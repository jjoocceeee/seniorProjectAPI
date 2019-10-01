import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';
import { schemaComposer } from 'graphql-compose';


const weightSchema = new mongoose.Schema({
  ticker: {
    type: String,
    descpription: "Ticker the weight belongs to",
    required: true
  },
  twitterWeight: {
    type: Number,
    description: "Twitter weight",
    required: true
  }, 
  fourWeight: {
    type: Number,
    description: "Four Candle Hammer Weight",
    required: true
  }, 
  profitWeight: {
    type: Number,
    description: "Profit Loss Ratio Weight",
    required: true
  }, 
  movingWeight: {
    type: Number,
    description: "20-day Moving Average Weight",
    required: true
  }, 
  companyWeight: {
    type: Number,
    description: "Company Metric Weight",
    required: true
  }, 
  date: {
    type: Date,
    description: "Date-Time for this price.",
    required: true
  }
});


const Weight = mongoose.model('Weight', weightSchema);
const customizationOptions = {};
export const WeightTC = composeWithMongoose(Weight, customizationOptions);

WeightTC.addResolver({
  name: "MostRecentWeight",
  type: "Weight",
  args: {
    ticker: "String!"
  },
  resolve: async ({args, source, context}) => {
    console.log("Getting most recent weight.");

    let response = await Weight.find({'ticker':args.ticker}).sort({ _id: -1 });
    console.log(response);
    return response[0];
  }
})



