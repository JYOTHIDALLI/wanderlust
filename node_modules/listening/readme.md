# listening
[![Build Status](http://img.shields.io/travis/vvo/listening/master)](https://travis-ci.org/vvo/listening)
[![Dependency Status](https://david-dm.org/vvo/listening.svg?theme=shields.io)](https://david-dm.org/vvo/listening)
[![devDependency Status](https://david-dm.org/vvo/listening/dev-status.svg?theme=shields.io)](https://david-dm.org/vvo/listening#info=devDependencies)

```shell
npm install listening --save
```

```js
var listening = require('listening');
listening(8080, function(err, res) {
  // res will be true/false
});
```

Listening API follows [server.listen API](http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback).

# why

Why would we want to test for a listening server before starting our own server,
can't we just try to `.listen` again later on?

The current answer for node 0.10.x is **no you can't**.

See the node.js [issue](https://github.com/joyent/node/issues/6488#issuecomment-38039906).
