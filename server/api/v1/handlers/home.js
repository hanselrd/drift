const HomeHandler = {
  home: (request, reply) => {
    reply({ message: 'hello v1' });
  }
}

module.exports = HomeHandler;
