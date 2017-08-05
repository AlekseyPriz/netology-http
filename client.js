var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
  'firstName' : 'Ivan', // Указываем имя пользователя
  'lastName' : 'Petrov' // Указываем фамилию пользователя
});

var options = {
  hostname: 'localhost',
  port: 3100,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var request = http.request(options, function(response) {
  console.log('Ответ STATUS: ' + response.statusCode);
  console.log('Ответ HEADERS: ' + JSON.stringify(response.headers));

  response.on('data', function (chunk) {
    console.log('Ответ BODY: ' + chunk);
  });

  response.on('end', function() {
    console.log('Ответ получен полностью.')
  })
});

request.on('error', e => { console.log('Ошибка с запросом: ' + e.message);});
request.write(postData);
request.end();



