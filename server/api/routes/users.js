const Joi = require('joi');

const sumModel = Joi.object({
    id: Joi.string().required().example('x78P9c'),
    a: Joi.number().required().example(5),
    b: Joi.number().required().example(5),
    operator: Joi.string().required().description('either +, -, /, or *').example('+'),
    equals: Joi.number().required().example(10),
    created: Joi.string().required().isoDate().description('ISO date string').example('2015-12-01'),
    modified: Joi.string().isoDate().description('ISO date string').example('2015-12-01')
}).label('Sum').description('json body for sum');

const errorModel = Joi.object({
    statusCode: Joi.number().required().example(400),
    error: Joi.string().required().example('Not Found')
}).label('Error');

const testHttpStatus = {
  '201': {
        'description': 'Success',
        'schema': sumModel
    },
    '400': {
        'description': 'Bad request (Reason #1)  \nBad request (Reason #2)',
        'schema': errorModel
    },
    '500': {
        'description': 'Internal Server Error',
        'schema': errorModel
    }
}

module.exports = [
  {
    method: 'GET',
    path: '/api/users',
    config: {
      handler: (request, reply) => { reply({}); },
      description: 'Get all users',
      notes: 'Returns all the users',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/users/{id}',
    config: {
      handler: (request, reply) => { reply(request.params); },
      description: 'Get a user',
      notes: 'Returns a user with corresponding id',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number()
            .required()
            .description('the id of the user')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/users',
    config: {
      handler: (request, reply) => { reply(request.payload); },
      description: 'Creates a user',
      notes: 'Creates a user if you supply correct information',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: testHttpStatus
        }
      },
      validate: {
        payload: {
          name: Joi.string()
            .required()
            .min(6)
            .regex(/^[a-zA-z\s]+$/, 'name')
            .description('the display name of the user'),
          username: Joi.string()
            .required()
            .min(6)
        }
      }
    }
  },
  {
    method: ['PUT', 'PATCH'],
    path: '/api/users/{id}',
    config: {
      handler: (request, reply) => { reply(request.params); },
      description: 'Updates user by id',
      notes: 'Updates user with corresponding id using information provided',
      tags: ['api']
    }
  },
  {
    method: 'DELETE',
    path: '/api/users/{id}',
    config: {
      handler: (request, reply) => { reply(request.params); },
      description: 'Deletes a user by id',
      notes: 'Deletes user with corresponding id',
      tags: ['api']
    }
  }
]
