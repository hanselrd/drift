const Hapi = require('hapi');
const Api = require('./api');

const server = new Hapi.Server();
server.connection({
  host: process.env.IP || 'localhost',
  port: process.env.PORT || 3000
});

server.register([
  require('inert'),
  require('vision'),
  require('hapi-plugin-router'),
  Api
], err => {
  if (err) throw err;
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
