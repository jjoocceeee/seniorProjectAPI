const Alpaca = require('@alpacahq/alpaca-trade-api')
var subDays = require('date-fns/subDays')
import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose, { mongo } from 'mongoose';
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
    console.log(pos);
    return pos;
  }
});


async function getPositions(){
  let pos = await alpaca.getPositions();
  console.log(pos);
  return pos 
}

async function getAccount(){
  let acc = await alpaca.getAccount()
  console.log(acc);
}








export { AccountTC, PortfolioTC };