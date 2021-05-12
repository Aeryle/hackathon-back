'use strict';
const Hapi = require('@hapi/hapi');
const { boss, phase, strategies } = require('./routes');

require('dotenv').config();

const init = async () => {
  try {
    const server = Hapi.server({
      port: +process.env.PORT || 8080,
      host: 'localhost',
      routes: {
        cors: {
          origin: [ '*' ]
        }
      }
    });

    await server.start();

    console.log('Server running on port', server.info.port);


    server.route({
      method: 'GET',
      path: '/boss/{bossId?}',
      handler: boss
    });

    server.route({
      method: 'GET',
      path: '/boss/{bossId}/phases/{phaseId?}',
      handler: phase
    });

    server.route({
      method: 'GET',
      path: '/boss/{bossId}/phases/{phaseId}/strategies',
      handler: strategies
    });
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error(err);

  process.exit(1);
});

init();
