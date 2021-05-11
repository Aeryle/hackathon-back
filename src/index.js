'use strict';
const Hapi = require('@hapi/hapi');
const { raids, boss, phase, roles } = require('./routes');

const init = async () => {
    
    try {
        const server = Hapi.server({
            port: +process.env.port || 8080,
            host: 'localhost'
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
            path: '/boss/{bossId}/phases/{phaseId}/roles',
            handler: roles
        });
    } catch (err) {
        console.error(err);

        proccess.exit(1);
    }
};

process.on('unhandledRejection', (err) => {
    console.error(err);

    process.exit(1);
});

init();
