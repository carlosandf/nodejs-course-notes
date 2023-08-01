const http = require('node:http');

const desirePort = process.env.PORT ?? 1234;

const server = http.createServer((req, res) => {
  console.log('request received', req.url);
  res.end('Hola Mundo');
});

server.listen(desirePort, () => {
  console.log(`server runing on http://localhost:${desirePort}`);
});
