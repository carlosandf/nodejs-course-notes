const http = require('node:http');
const { findAvailablePort } = require('./10.free-port.js');

const desirePort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log('request received');
  res.end('Hola Mundo');
});

findAvailablePort(desirePort).then(port => {
  server.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
  });
});
