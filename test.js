var weatherController = require('./services/weather.js');
weatherController.getWeatherFiveDayForeCastCall(19.340248, -99.180588, function(weather){
  console.log(weather);
});
