// Gets the daily stock price and puts it inot the mongodb database.
const axios = require('axios');
const result = require('dotenv').config()
var _ = require('lodash');
var format = require('date-fns/format');

if (result.error) {
  throw result.error
}

let universe = {
  universe: [
    {

    },
    {

    },
  ]
}
 
async function createUniverse(ticker){

  _.forEach(timeSeries, function(value, key) {

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

    console.log("Payload: ", payload);
    let response = await axios({
      url: 'https://seniorprojectu.herokuapp.com/graphql',
      method: 'post',
      data: {
        query: payload
      }
    });
    
    if(response.status != 200){
      console.log("There was an error in the response: ", response.status);
      return;
    }
    console.log(response.data);

}




// let priceObject = {}
let priceObject = { '1. open': '120.6400',
'2. high': '120.9800',
'3. low': '120.3700',
'4. close': '120.9500',
'5. volume': '19745100' }
// recordOpenClose('2019-04-12', priceObject);

ScrapDailyData('MSFT');



// TODO: Get last updated date

