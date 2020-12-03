import http = require('http');
import app from './app';
const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log('Server is running ...')
});
