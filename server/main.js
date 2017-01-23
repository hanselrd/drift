const Hapi = require('hapi');
const Api = require('./api');

const server = new Hapi.Server();
server.connection({
  host: process.env.IP || 'localhost',
  port: process.env.PORT || 3000
});

server.register({
  register: require('hapi-api-version'),
  options: {
    validVersions: [1, 2],
    defaultVersion: 2,
    vendorName: Api.register.attributes.name,
    passiveMode: true,
    basePath: '/api'
  }
}, err => {
  if (err) {
    throw err;
  }

  server.register([
    require('inert'),
    require('vision'),
    {
      register: require('hapi-swagger'),
      options: {
        info: {
          title: Api.register.attributes.name,
          version: Api.register.attributes.version
        }
      },
      routes: {
        prefix: '/api'
      }
    },
    require('hapi-plugin-router'),
    Api
  ], err => {
    if (err) {
      throw err;
    }
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
    if (err) {
      throw err;
    }

    server.start(err => {
      if (err) {
        throw err;
      }

      console.log(`Drift running at: ${server.info.uri}`);
    });
  });
});
