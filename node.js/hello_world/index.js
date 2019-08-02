var http = require('http');
var https = require('https');
var url = require('url');
var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;

var config = require('./config');

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
        // console.log('Request is received on path: ' + trimmedPath + ' with method ' + method + ' and with these query string parameters ', queryStringObject);
        // console.log("Request received with these headers ", headers);
        // console.log("Request received with this payload: ", buffer);
        console.log("Returning this reponse: ", statusCode, payloadString);
      });
   });
};

// Define the handlers
var handlers = {};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

// Ping handler
handlers.hello = function(data, callback) {
  callback(200, {'message': "Hello World!"});
}

// Define a request router
var router = {
  'hello' : handlers.hello
};
