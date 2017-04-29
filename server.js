var express = require('express'),
  app = express(),
  Task = require('./api/models/v1Model'),
  port = process.env.PORT || 8181,
  bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/v1Routes');
routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);