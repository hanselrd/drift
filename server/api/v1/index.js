const V1 = {
  register: (server, options, next) => {
    const router = server.plugins['hapi-plugin-router'];
    router.setup('routes/**/*.js');
    next();
  }
};

V1.register.attributes = {
  name: 'v1',
  version: '1.0.0'
};

module.exports = V1;
