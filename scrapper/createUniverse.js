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
  ]
}
 
async function createUniverse(){

  _.forEach(universe.universe, function(value, key) {
    addToUniverse(value.ipo_date, value.ticker, value.company);
  });
}



/*
 * 
 *
 */
async function addToUniverse(ip_date, ticker, company){

    let payload = `
    mutation {
      addStockToUniverse(record: {ticker: "${ticker}", name: "${company}", IPO_date: "${ip_date}"}) {
        record {
          ticker
          _id
        }
      }
    }
      `

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

createUniverse();
