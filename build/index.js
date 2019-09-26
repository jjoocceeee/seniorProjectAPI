"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _schemaComposer = _interopRequireDefault(require("./schema/schemaComposer.js"));

require("babel-core/register");

require("babel-polyfill");

var mongoose = require('mongoose');

var graphql = require('graphql');

var expressGraphql = require('express-graphql');

var main = function main() {
  var app = (0, _express["default"])();
  console.log("Data base name: ", process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI);
  var db = mongoose.connection;
  db.on('error', function () {
    console.log('---FAILED to connect to mongoose');
  });
  db.once('open', function () {
    console.log('+++Connected to mongoose');
  });
  app.use('/graphql', expressGraphql({
    schema: _schemaComposer["default"],
    graphiql: true
  }));
  app.get('/', function (req, res) {
    res.send('ok');
  });
  app.listen(process.env.PORT || 8000, function () {
    console.log('Graphql Server Running');
  });
};

main();
//# sourceMappingURL=index.js.map