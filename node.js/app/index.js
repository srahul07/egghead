/*
 * This is the primary file for API
 */

  // Dependecies
  var http = require('http');
  var https = require('https');
  var url = require('url');
  var StringDecoder = require('string_decoder').StringDecoder;
  var fs = require('fs');
  var config = require('./config');
  var handlers = require('./lib/handlers');

  // Instantiating HTTP server
  var httpServer = http.createServer(function(req, res) {
    unifiedServer(req, res);
  });

  // Start the server, and have it listen on port 3000
  httpServer.listen(config.httpPort, function(){
    console.log("The server is listening on port " + config.httpPort);
  });

  // Instantiating HTTPS server
  var httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
  };
  var httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res);
  });

  // Start the HTTPS server
  httpsServer.listen(config.httpsPort, function() {
    console.log("The server is listening on port " + config.httpsPort);
  });


  // All the server logic for both http and https server
  var unifiedServer = function(req, res) {
    // Get the url and parse it
    var parsedUrl = url.parse(req.url, true)

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer =  '';
    req.on('data', function(data){
      buffer += decoder.write(data);
    });
    req.on('end', function(){
      buffer += decoder.end();

      // Choose the handler this request should go to. If one is not found use the not found handler
      var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

      // Construct the data object to send to handler
      var data  = {
        'trimmedPath': trimmedPath,
        'queryStringObject': queryStringObject,
        'method': method,
        'payload': buffer
      };

      // Route the request to the handler specified in the router
      chosenHandler(data, function(statusCode, payload){
        // Use the status code called back by the handle, or default to 200
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

        // Use the payload called back by the handler, or default to {}
        payload = typeof(payload) == 'object' ? payload : {};

        // Convert the palyload to a string
        var payloadString = JSON.stringify(payload);

        // Return the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);

        // Log the request path
        console.log("Returning this reponse: ", statusCode, payloadString);
      });
    });
};

// Define a request router
var router = {
  'ping' : handlers.ping,
  'users': handlers.users
};
