"use strict";

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _stock = _interopRequireDefault(require("./schema/stock.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    schema: _stock["default"],
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