//This module is for getting weather


var https = require("https");
var http = require("http");

var consoleDebuggingString = "WEATHERSERVICE:::";

var weatherChocolate = "8ece0e93082d34c157fb30b8d73c5e60";

exports.getWeatherCall = function(lat, lon) {
  console.log("SHOULD RECIEVE WEATHER SOON");
  var url = "api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&APPID="+weatherChocolate;
  var req = http.get(url, function(result){
    console.log(consoleDebuggingString + "getting weather:::STATUS:" + result.statusCode);
    console.log(consoleDebuggingString + "getting weather:::HEADERS:" + JSON.stringify(result.headers));

    console.log(consoleDebuggingString + "RESULTS:" + result);
  });
}
