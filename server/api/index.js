const V1 = require('./v1');

const Api = {
  register: (server, options, next) => {
    server.register(V1, err => {
      if (err) {
        throw err;
      }
    });
    next();
  }
};

Api.register.attributes = {
  name: 'drift-api',
  version: '1.0.0'
};

module.exports = Api;
