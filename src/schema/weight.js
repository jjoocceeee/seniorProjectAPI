import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import _ from "lodash"


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
    required: true,
    index: true
  }
});


const Weight = mongoose.model('Weight', weightSchema);
const customizationOptions = {};
export const WeightTC = composeWithMongoose(Weight, customizationOptions);

WeightTC.addResolver({
  name:"RecentWeights",  
  description:"Will provide recents weights for the ticker. The number of weights is determined by the count argument.",
  args: {
      count: "Int!",
      ticker: "String!"
    },
    type: ["Weight"],
    resolve: async ({args, source, context}) => {
      let weights = await Weight.find({'ticker': args.ticker}).sort({date: -1}).limit(args.count);
      return weights;
    }
  })




WeightTC.addResolver({
  name: "MostRecentWeight",
  description:"Provides the most recent weight.",
  type: "Weight",
  args: {
    ticker: "String!"
  },
  resolve: async ({args, source, context}) => {
    let response = await Weight.find({'ticker':args.ticker}).sort({ _id: -1 });
    return response[0];
  }
})


WeightTC.addResolver({
  name: "AllWeightsTicker",
  type: ["Weight"],
  args: {
    ticker: "String!"
  },
  resolve: async ({args, source, context}) => {
    let response = await Weight.find({'ticker':args.ticker}).sort({ _id: -1 });
    return response;
  }
})

WeightTC.addResolver({
  name:"WeightCount",  
  description:"Count of total weights in ML algorithm.",
  type: "Int",
  resolve: async ({args, source, context}) => {
    return await Weight.count();
  }
})



