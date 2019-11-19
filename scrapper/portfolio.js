// Gets the daily stock price and puts it inot the mongodb database.
const axios = require('axios');
const result = require('dotenv').config()
var _ = require('lodash');
var format = require('date-fns/format');

if (result.error) {
  throw result.error
}
 
async function ScrapDailyData(ticker){
  let response = await axios.get('https://www.alphavantage.co/query', {
    params: {
      function:'TIME_SERIES_DAILY',
      symbol:ticker,
      apikey:process.env.ALPHAVANTAGEAPIKEY
    }
  }).catch((e)=>{
    console.log("Unable to Get Data.")
    console.log("Error: ", e)
  });
if(response.status != 200){
  console.log("There was an error in the response: ", response.status);
  return;
}
  let timeSeries = response.data['Time Series (Daily)'];
  // console.log(timeSeries);
  _.forEach(timeSeries, function(value, key) {
    //Record the opening and closing price for each date
    recordOpenClose(key, value, ticker);
  });
}



/*
 * Will input the daily stock prices recieved from Alpha Vantage into the database. 
 *
 * PARAMETERS: 
 */
async function recordOpenClose(date, priceObject, ticker){
  //Convert Date to YYYY-MM-DDTHH:MM:SS.SSSZ
    let newDate = format(new Date(date), "yyyy-MM-dd'T00':mm:ss.SSS'Z'");

    //Get the open price and the closing price
    let payload = `
    mutation{
      insertPrice(record:{
        openPrice:${open},
        closePrice:${close},
        date:"${newDate}",
        ticker:"${ticker}",
        volume:${volume}
      })
      {
        recordId
      }
    }
      `
    console.log("Date: ", newDate);
    let response = await axios({
      url: process.env.APIENDPOINT,
      method: 'post',
      data: {
        query: payload
      }
    }).catch((e)=>{
      console.log("Unable to make request.")
      console.log("Error: ", e)
    });
    
    if(response.status != 200){
      console.log("There was an error in the response: ", response.status);
      return;
    }
    console.log(response.data);

}
// POSITION EXAMPLE
// {
//   "asset_id": "3bd2f8c7-ceb9-4916-8a1e-4bcf3654efd9",
//   "symbol": "SQ",
//   "exchange": "NYSE",
//   "asset_class": "us_equity",
//   "qty": "207",
//   "avg_entry_price": "72.6166666666666667",
//   "side": "long",
//   "market_value": "12761.55",
//   "cost_basis": "15031.65",
//   "unrealized_pl": "-2270.1",
//   "unrealized_plpc": "-0.1510213449621299",
//   "unrealized_intraday_pl": "-442.98",
//   "unrealized_intraday_plpc": "-0.0335475779902806",
//   "current_price": "61.65",
//   "lastday_price": "63.79",
//   "change_today": "-0.0335475779902806"
// },

async function main(){
  console.log("Starting");


}

main();



