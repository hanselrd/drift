'use strict';

const Hapi = require('hapi');
const Config = require('./config');

const server = new Hapi.Server();
server.connection({
  host: process.env.IP || Config.server.host,
  port: process.env.PORT || Config.server.port
});

server.register({
  register: require('good'),
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, err => {
  if (err) throw err;

  server.start(err => {
    if (err) throw err;
    console.log(`Drift running at: ${server.info.uri}`);
  });
});
