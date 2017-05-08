var http = require('http');
var weatherController = require('./services/weather.js');

weatherController.getWeatherCall(30,30);
