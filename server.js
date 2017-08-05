var http = require('http');
var querystring = require('querystring');

var server = http.createServer().listen(3100);

server.on('request', function(request,response) {
  if (request.method == 'POST') {
    var body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      var post = querystring.parse(body);
      console.log(post);

      let hashRequestOptions = {
        hostname: 'netology.tomilomark.ru',
        port: 3000,
        path: '/api/v1/hash',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'firstname': post.firstName
        }
      };

      const requestHash = http.request(hashRequestOptions);
      requestHash.on('error', err => console.error(err));
      requestHash.on('response', responseHash => {

        let data = '';

        responseHash.on('data', function (chunk) {
          data += chunk;
        });

        responseHash.on('end', function () {
          hashFromData = JSON.parse(data);
          post.secretKey = hashFromData.hash;
          console.log('SecretKey от netology.tomilomark.ru: ' + post.secretKey);

          response.writeHead(200, {'Content-Type': 'application/json'});

          response.end(JSON.stringify(post));
        });
      });

      requestHash.write(querystring.stringify({'lastName': post.lastName}));

      requestHash.end();
    });
  }
});

console.log('server listening on 8214');