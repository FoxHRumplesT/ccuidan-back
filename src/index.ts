import Server from './server/server';

const server = Server.init(3000);
server.start(() => {
    // console.log('Ejecutando en puerto 3000');
});
