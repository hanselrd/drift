const Api = {
  register: (server, options, next) => {
    server.route({
      method: 'GET',
      path: '/api',
      config: {
        handler: (request, reply) => {
          reply({ message: 'hello' });
        },
        description: 'Get api root',
        notes: 'Returns the contents at api root',
        tags: ['api']
      }
    });
    next();
  }
};

Api.register.attributes = {
  name: 'api',
  version: '1.0.0'
};

module.exports = Api;
