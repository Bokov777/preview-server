module.exports = function(request, response) {
  response.statusCode = 200;
  response.setHeader('content-type', 'text/html; charset=utf-8');
  response.end('<!DOCTYPE html><html><body><h1>Test</h1></body></html>');
};
