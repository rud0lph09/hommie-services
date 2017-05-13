var express = require('express')
var weatherController = require('./services/weather.js');
var app = express()

app.get('/', function (req, res) {
  res.send(JSON.stringify(weatherController.getWeatherFiveDayForeCastCall(19.340248, -99.180588)));
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!')
})
