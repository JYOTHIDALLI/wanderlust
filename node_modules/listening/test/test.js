var assert = require('assert');

describe('listening', function(){
  var listening = require('../')

  var server;

  beforeEach(function(done) {
    server = require('net').createServer();
    server.once('listening', done);
    server.listen(0);
  });

  afterEach(function(done) {
    if (server.address() !== null) {
      server.close(done);
    } else {
      done();
    }
  });

  describe('when server started', function() {
    it('says port in use', function(done) {
      listening(server.address().port, server.address().hostname, function(err, result) {
        assert.equal(result, true);
        done();
      });
    });

    describe('when server stops', function() {
      var address;

      beforeEach(function(done) {
        address = server.address();
        server.close(done);
      });

      it('says port is free', function(done) {
        listening(address.port, address.hostname, function(err, result) {
          assert.equal(result, false);
          done();
        });
      });
    });

  });
});