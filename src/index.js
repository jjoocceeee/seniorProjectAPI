import express from 'express';
import 'dotenv/config';
import schema from "./schema/schemaComposer.js"
var mongoose = require('mongoose');
var graphql = require('graphql');
var expressGraphql = require('express-graphql');

const main = () => {
  const app = express();
  console.log("Data base name: ", process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI);
  var db = mongoose.connection;
  db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
  db.once('open', () => {
    console.log( '+++Connected to mongoose')
  })
  app.use('/graphql', expressGraphql ({
    schema: schema,
    graphiql:true
  }))

  app.get('/', (req, res) => {
    res.send('ok');
  })
  
  app.listen( process.env.PORT || 8000, () => {
    console.log('Graphql Server Running');
  });
}

main();
