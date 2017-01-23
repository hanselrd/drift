const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/packages',
    config: {
      handler: (request, reply) => { reply({}); },
      description: 'Get all packages',
      notes: 'Returns all the packages',
      tags: ['api']
    }
  }
]
