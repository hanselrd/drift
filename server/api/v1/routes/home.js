const HomeHandler = require('../handlers/home');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1',
    config: {
      handler: HomeHandler.home,
      description: 'Get api root',
      notes: 'Returns the contents at api root',
      tags: ['api', 'v1']
    }
  }
]
