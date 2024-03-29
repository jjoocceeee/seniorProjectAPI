const Alpaca = require('@alpacahq/alpaca-trade-api')
var subDays = require('date-fns/subDays')
import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';
import _ from 'lodash'



const alpaca = new Alpaca({
  keyId: process.env.alpaca_api_key_id,
  secretKey: process.env.alpaca_api_secret_key,
  paper: true,
})


const AccountSchema = new mongoose.Schema({
  value: {
    type: Number,
    description: "Wallet Value at end of day.",
    required: true
  }, 
  date: {
    type: Date,
    description: "Date Account object was updated."
  }
});

const PortfolioSchema = new mongoose.Schema({
  value: {
    type: Number,
    description: "Wallet Value at end of day.",
    required: true
  }, 
  date: {
    type: Date,
    description: "Date Account object was updated."
  },
  ticker: {
    type: String,
    description: "Ticker symbol "
  },
  qty: {
    type: Number,
    description: "Quantity of stocks owned"
  }, 
  change_today: {
    type: Number,
    description: "Change for today"
  },
  price: {
    type: Number, 
    description: "Current Price of the stock"
  }
});



const Account = mongoose.model('Account', AccountSchema);
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {};
const AccountTC = composeWithMongoose(Account, customizationOptions);
const PortfolioTC = composeWithMongoose(Portfolio, customizationOptions);


AccountTC.addResolver({
  name: "getPositions",
  type: "JSON",
  resolve: async ({args, source, context}) => {
    let pos = await getPositions();
    return pos;
  }
});

AccountTC.addResolver({
  name: "getAccount",
  type: "JSON",
  resolve: async ({args, source, context}) => {
    let acc = await getAccount();
    return acc;
  }
});

AccountTC.addResolver({
  name: "getTrades",
  args:{
    fromDate: "Date",
    toDate: "Date"
  },
  type: "JSON",
  resolve: async ({args, source, context}) =>{
    let from;
    let to;
    if(!args.fromDate){
      from = subDays(new Date(), 50);
    } else{
      from = args.fromDate;
    }
    if(!args.toDate){
      to = new Date();
    } else{
      to = args.toDate;
    }


    let trades = await getTrades(from, to);
    return _.map(trades, trade=>{
      return {
        "ticker": trade.symbol,
        "qty":trade.qty,
        "side":trade.side,
        "date":trade.filled_at,
        "price_per_stock":trade.filled_avg_price
      }
    })
    
  }
})


async function getPositions(){
  let pos = await alpaca.getPositions();
  return pos;
}

async function getAccount(){
  let acc = await alpaca.getAccount();
  return acc;
}

async function getTrades(after, until){
  let trades = await alpaca.getOrders({
    status: 'all',
    after: after,
    until: until,
    direction: 'asc'
  })
  return trades
}



export { AccountTC, PortfolioTC };