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
 * date: YYYY-MM-dd
 * priceObject => JSON object holding price info for that day.
 *                { '1. open': '120.6400',
 *                  '2. high': '120.9800',
 *                  '3. low': '120.3700',
 *                  '4. close': '120.9500',
 *                  '5. volume': '19745100' }
 *
 */
async function recordOpenClose(date, priceObject, ticker){
  //Convert Date to YYYY-MM-DDTHH:MM:SS.SSSZ
    let newDate = format(new Date(date), "yyyy-MM-dd'T00':mm:ss.SSS'Z'");

    //Get the open price and the closing price
    let open = priceObject['1. open'];
    let close = priceObject['4. close'];
    let volume = priceObject['5. volume'];
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
    
}




async function recordPortfolio(){
  let date = momentTZ(new Date()).tz("America/Phoenix").format('YYYY-MM-DD') + "T00:00:00.000Z";
  console.log("date: ", date);
}
// let priceObject = {}
// let priceObject = { '1. open': '120.6400',
// '2. high': '120.9800',
// '3. low': '120.3700',
// '4. close': '120.9500',
// '5. volume': '19745100' }
// recordOpenClose('2019-04-12', priceObject);

async function main(){
  console.log("Starting");
  _.forEach(universe, (stock) => {
    ScrapDailyData(stock.ticker);
  });

}

let universe = [
  {
    ticker:'AMZN',
    company:'Amazon',
    ipo_date:"1997-03-15T09:00:00.000Z"
  },  
  {
    ticker:'TSLA',
    company:'Tesla',
    ipo_date:"2010-06-29T09:00:00.000Z"
  },
  {
    ticker:'WMT',
    company:'Walmart',
    ipo_date:"1972-08-25T09:00:00.000Z"
  },
  {
    ticker:'AAPL',
    company:'Apple',
    ipo_date:"1980-12-12T09:00:00.000Z"
  },
  {
    ticker:'JNJ',
    company:'Johnson & Johnson',
    ipo_date:"1944-09-24T09:00:00.000Z"
  },
  {
    ticker:'GOOG',
    company:'Google',
    ipo_date:"2004-08-19T09:00:00.000Z"
  },
  {
    ticker:'XOM',
    company:'Exxon',
    ipo_date:"1978-01-13T09:00:00.000Z"
  },
  {
    ticker:'GE',
    company:'General Electric',
    ipo_date:"1978-01-13T09:00:00.000Z"
  },
  {
    ticker:'JPM',
    company:'JPMorgan',
    ipo_date:"1980-04-01T09:00:00.000Z"
  },
];

main();



