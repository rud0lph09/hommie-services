//This module is for getting weather
var request = require("request");
var consoleDebuggingString = "WEATHERSERVICE:::";
var weatherChocolate = "8ece0e93082d34c157fb30b8d73c5e60";

exports.getWeatherFiveDayForeCastCall = function(lat, lon, whenCompleted) {

  var options = { method: 'GET',
  url: 'http://api.openweathermap.org/data/2.5/forecast',
  qs:
   { lat: lat,
     lon: lon,
     APPID: '8ece0e93082d34c157fb30b8d73c5e60' },
  headers:
   { 'postman-token': '58586fe2-d611-08fd-f33f-53d6d7804fbe',
     'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
      var jsonData = JSON.parse(body);

      var forecastData = forcastDataInit( jsonData.list,
                                          {
                                            country: jsonData.city.country,
                                            city: jsonData.city.name,
                                            lat: jsonData.city.coord.lat,
                                            lon: jsonData.city.coord.lon
                                          });

      whenCompleted(error,forecastData);

  });

}

forcastDataInit = function(weatherList, geoData){
  var forecastData = {
                  geo_data: {
                    country: geoData.country,
                    city: geoData.city,
                    lat: geoData.lat,
                    lon: geoData.lon
                  },
                  forecast: []
                };
                // console.log(weatherList);
  for (var i in weatherList){
    let weatherData = weatherUnitInit(weatherList[i].weather[0].id,
                                  weatherList[i].weather[0].main,
                                  weatherList[i].weather[0].description,
                                  weatherList[i].dt,
                                  weatherList[i].main);
    forecastData.forecast.push(weatherData);
  }

  return forecastData;
}

// {"city":{"id":1851632,"name":"Shuzenji",
// "coord":{"lon":138.933334,"lat":34.966671},
// "country":"JP",
// "cod":"200",
// "message":0.0045,
// "cnt":38,
// "list":[{
//         "dt":1406106000,
//         "main":{
//             "temp":298.77,
//             "temp_min":298.77,
//             "temp_max":298.774,
//             "pressure":1005.93,
//             "sea_level":1018.18,
//             "grnd_level":1005.93,
//             "humidity":87
//             "temp_kf":0.26},
//         "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
//         "clouds":{"all":88},
//         "wind":{"speed":5.71,"deg":229.501},
//         "sys":{"pod":"d"},
//         "dt_txt":"2014-07-23 09:00:00"}
//         ]}

exports.getWeatherCall = function(lat,lon, whenCompleted){
  var options = { method: 'GET',
  url: 'http://api.openweathermap.org/data/2.5/weather',
  qs:
   { lat: lat,
     lon: lon,
     APPID: '8ece0e93082d34c157fb30b8d73c5e60' },
  headers:
   { 'postman-token': '58586fe2-d611-08fd-f33f-53d6d7804fbe',
     'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

      var jsonData = JSON.parse(body)
      // console.log(jsonData);

      let weather = weatherInit(jsonData.weather[0].id,
                                jsonData.weather[0].main,
                                jsonData.weather[0].description,
                                jsonData.dt,
                                jsonData.sys,
                                jsonData.main,
                                { country: jsonData.sys.country,
                                  city: jsonData.name,
                                  lat: jsonData.coord.lat,
                                  lon: jsonData.coord.lon
                                });

      whenCompleted(error, weather);


  });
}

// {"coord":{"lon":139,"lat":35},
// "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
// "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
// "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
// "wind":{"speed":7.31,"deg":187.002},
// "rain":{"3h":0},
// "clouds":{"all":92},
// "dt":1369824698,
// "id":1851632,
// "name":"Shuzenji",
// "cod":200}

getFormatedTimeStamp = function(unix_timestamp){
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp*1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return {
    "time": formattedTime,
    "date": date.getDate() + ' ' + date.getMonth()
  }
}

weatherUnitInit = function(id, main, description, time, specificData){
  return {
    "id": id,
    "main_descriptor": main,
    "description": description,
    "time": getFormatedTimeStamp(time),
    "specific_data": specificDataInit(specificData["temp"],
                                      specificData["humidity"],
                                      specificData["pressure"],
                                      specificData["temp_min"],
                                      specificData["temp_max"]),
  };
}

weatherInit = function(id, main, description, time, staticData, specificData, localData){
  return {
    "id": id,
    "main_descriptor": main,
    "description": description,
    "time": getFormatedTimeStamp(time),
    "static_data": staticDataInit(staticData["country"],
                                  staticData["sunrise"],
                                  staticData["sunset"]),
    "specific_data": specificDataInit(specificData["temp"],
                                      specificData["humidity"],
                                      specificData["pressure"],
                                      specificData["temp_min"],
                                      specificData["temp_max"]),
    "geo_data": { "country": localData.country,
                  "city": localData.city,
                  "lat": localData.lat,
                  "lon": localData.lon
                }

  };
}

staticDataInit = function(country, sunrise, sunset){
  return {
    "country": country,
    "sun-rise": sunrise,
    "sun-set": sunset
  };
}

specificDataInit = function(temp, humidity, presure, tMin, tMax){
  return {
    "temperature": temp,
    "humidity": humidity,
    "pressure": presure,
    "min-Temperature": tMin,
    "max-Temperature": tMax
  };
}
