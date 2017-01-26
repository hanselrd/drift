const Nano = require('nano')(process.env.COUCHDB_URL);

exports.register = (server, options, next) => {
  // Maybe make more generic and use options.
  // options.db_url?
  server.expose(Nano);
  next();
};

exports.register.attributes = {
  name: 'hapi-nano',
  version: '1.0.0'
};
