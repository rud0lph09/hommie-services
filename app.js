var express = require('express')
var authDelegate = require('./custom_modules/auth.js')
var weatherController = require('./services/weather.js');
var app = express()

app.get('/weather/forecast', function (req, res) {
  weatherController.getWeatherFiveDayForeCastCall(19.340248, -99.180588, function(error, weather){
      if (authDelegate.simpleApiAuthWasSuccessful(req.query["api_token"])){
        if (error == null){
          res.send(weather);
        } else {
          res.send({error: "Algo raro ha sucedido, intenta de nuevo mas tarde"});
        }
      }  else {
        res.send({error: "No tienes acceso, consulta con el proovedor"});
      }


  });
})
//
app.get('/weather/current', function (req, res) {
  weatherController.getWeatherCall(19.340248, -99.180588, function(error, weather){
    if (authDelegate.simpleApiAuthWasSuccessful(req.query["api_token"])){
      if (error == null){
        res.send(weather);
      } else {
        res.send({error: "Algo raro ha sucedido, intenta de nuevo mas tarde"});
      }
    }  else {
      res.send({error: "No tienes acceso, consulta con el proovedor "});
    }
  });
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!')
})
