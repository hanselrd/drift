const Config = require('./config');

const Api = {
  register: (server, options, next) => {
    server.register([
      /*{
        register: require('hapi-api-version'),
        options: {
          validVersions: [1, 2],
          defaultVersion: 1,
          vendorName: Config.name,
          passiveMode: true,
          basePath: '/api'
        }
      },*/
      {
        register: require('hapi-swagger'),
        options: {
          basePath: '/api',
          pathPrefixSize: 2,
          info: {
            title: Config.title,
            version: Config.version,
            description: 'Authentication platform for cross-platform apps',
            termsOfService: server.info.uri + '/api/tos'
          },
          tags: [
            {
              name: 'users',
              description: 'User operations'
            },
            {
              name: 'packages',
              description: 'Package operations'
            }
          ],
          securityDefinitions: {
            basic_auth: {
              type: 'basic',
            },
            jwt_auth: {
              type: 'apiKey',
              name: 'authorization',
              in: 'header'
            }
          },
          documentationPath: '/api/docs',
          jsonEditor: true
        }
      }
    ], err => {
      if (err) throw err;
    });
    server.plugins['hapi-plugin-router']
      .setup('routes/**/*.js');
    next();
  }
};

Api.register.attributes = {
  name: Config.name,
  version: Config.version
};

module.exports = Api;
