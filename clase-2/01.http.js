const http = require('node:http');
const fs = require('node:fs');

const desirePort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        req.statusCode = 500;
        res.end('<h1>500 - Error en el servidor</h1>');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/image.png') {
    fs.readFile('./cover.png', (err, data) => {
      if (err) {
        req.statusCode = 500;
        res.end('<h1>500 - Error en el servidor</h1>');
      } else {
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/contact') {
    res.end('<h1>Página de contácto</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404 - Not Found</h1>');
  }

  console.log('request received', req.url);
};

const server = http.createServer(processRequest);

server.listen(desirePort, () => {
  console.log(`server runing on http://localhost:${desirePort}`);
});
