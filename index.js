var http = require('http');
var weatherController = require('./services/weather.js');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello New York\n');
}).listen(3001);
weatherController.getWeatherCall(30,30);
console.log('Server running at http://localhost:3001/');
