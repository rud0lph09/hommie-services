var express = require('express')
var weatherController = require('./services/weather.js');
var app = express()

app.get('/weather/forecast', function (req, res) {
  weatherController.getWeatherFiveDayForeCastCall(19.340248, -99.180588, function(weather){
    res.send(weather);
  });
})

app.get('/weather/current', function (req, res) {
  weatherController.getWeatherCall(19.340248, -99.180588, function(weather){
    res.send(weather);
  });
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!')
})
