weatherController = require('./services/weather.js');
weatherController.getWeatherFiveDayForeCastCall(19.340248, -99.180588, function(error, weather){
  console.log(weather);
});
