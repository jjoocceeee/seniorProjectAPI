import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';
import universe from '../universe';
var moment = require('moment-business-days');
var momentTZ = require('moment-timezone');

// import { addHours } from 'date-fns/esm';

var _ = require('lodash');
var addDays = require('date-fns/addDays');
var differenceInDays = require('date-fns/differenceInDays')
var subDays = require('date-fns/subDays')
var format = require('date-fns/format')


moment.updateLocale('us', {
  workingWeekdays: [1, 2, 3, 4, 5]
});

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
  date: {
    type: Date,
    description: "Date-Time for this price.",
    required: true,
    index: true
  },
  ticker: {
    type: String,
    description: "Stock this price is associated with.",
    required: true,
    index:true
  },
  // bull: {
  //   type: Boolean,
  //   desctption: "Whether or not the stock is up from the previous day."
  // }
});




// priceSchema.post('save', async function() {
//     let yestPrice = Price.findOne({ticker: this.ticker}).sort({date: -1})
//     if(yestPrice){
//       this.bull= prev.closePrice < this.openPrice
//     }
// });

const Price = mongoose.model('Price', priceSchema);
const customizationOptions = {};
const PriceTC = composeWithMongoose(Price, customizationOptions);


PriceTC.addFields({
  bull: () => ({
    type: "Boolean",
    resolve: async (source) => {
      let yestPrice = await Price.findOne({ticker: source.ticker}).sort({date: -1})
      if(yestPrice){
        return yestPrice.closePrice < source.openPrice
      }
      return NULL;
    }
  })
})
PriceTC.addResolver({
  name: "checkTwentyDayHigh",
  type: "Boolean",
  args: {
    date: "Date!",
    ticker: "String!"
  },
  resolve: async ({args, source, context}) => {
    return await CheckTwentyDay(args.date).highCheck
  }
})


PriceTC.addResolver({
  name: "UpdateBull",
  type: "Boolean",
  resolve: async({args, source, context}) => {
    let prev = momentTZ(new Date()).tz("America/Phoenix").prevBusinessDay().format('YYYY-MM-DD') + "T00:00:00.000Z";

    let prices1 = await Price.findOne({
      'date':prev,
      'ticker': args.ticker
    });


  }
})

PriceTC.addResolver({
  name: "fourCandleHammer",
  type: "Boolean",
  args: {
    date: "Date!",
    ticker: "String!",
  },
  resolve: async ({args, source, context}) => {
      let indexDate = new Date(args.date);
      let twentyDayHighDate = new Date(addDays(indexDate, -24));
      let twenty = await CheckTwentyDay(twentyDayHighDate);
      if(twenty.highCheck){
        return await checkPullBack(twenty.highPrice, -4, indexDate, args.ticker);
      }
  }
});


//Get the price for today for each product 
PriceTC.addResolver({
  name: "pricesUniverse",
  type: ["Price"],
  resolve: async ({args, source, context}) => {
      let indexDate = format(subDays(new Date(), 1), 'yyyy-MM-dd')+"T00:00:00.000Z";
      let latestPrices = _.map(universe.universe, priceObjects => {
        return Price.findOne({ticker: priceObjects.ticker}).sort({date: -1})
      })
      return Promise.all(latestPrices);
  }
});


/*
 * Check if there was a 20 day high followed by a 4 day pullback.
 * This method is commonly referred to as the Four Candle Hammer Algorithm.
 * Parameters:        prevhigh  =>  High $ to check to pullback against.
 *                    number    =>  number of days to check for a pullback. Default is 4.
 *                    date      =>  Date to check the four candle hammer around (will often be today).
 *                    ticker    =>  Ticker symbol for the stock.
 *
 */
async function checkPullBack(prevhigh, number, date, ticker){
  let amount = number || -4;
  let indexDate = new Date(date);
  let pullbackDate = new Date(addDays(indexDate, amount));
  let prices = await Price.find({
    'date':{
      $lte:indexDate,
      $gt:pullbackDate
    },
    'ticker':ticker
  });
  let high = prevhigh;
  let check = true;
  _.forEach(prices, price => {
    if(price.openPrice > high){
      check = false;
    }
  });
  return check;
}



async function CheckTwentyDay(date, ticker){
  let indexDate = new Date(date);
  let twentyBefore = new Date(addDays(indexDate, -20));
  let prices = await Price.find({
    'date':{
      $lte:indexDate,
      $gt:twentyBefore
    },
    'ticker':ticker
  });

  let high = 0.0;
  let highPriceDate = indexDate;
  _.forEach(prices, price => {
    if(price.closePrice > high){
      high = price.closePrice;
      highPriceDate = price.date
    }
  });
  if(differenceInDays(indexDate, highPriceDate) == 0){
    return {
      highCheck:true,
      highDate: highPriceDate,
      highPrice:high
    }
  } else {
    return {
      highCheck:false,
      highDate: highPriceDate,
      highPrice:high
    }
  }
}

export { PriceTC };