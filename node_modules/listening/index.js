module.exports = listening;

function listening() {
  var net = require('net');

  var args = Array.prototype.slice.call(arguments);
  var cb = args.pop();
  var isListening;

  var server = net.createServer();
  server.on('listening', function free() {
    server.close(function closed() {
      cb(null, false);
    });
  });

  server.on('error', function used() {
    cb(null, true)
  });

  server.listen.apply(server, args);
}