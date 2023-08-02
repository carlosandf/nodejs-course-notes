const http = require('node:http');

const dittoJSON = require('./pokemon/ditto.json');

const port = process.env.PORT ?? 1235;

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET': {
      switch (url) {
        case '/pokemon/ditto': {
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify(dittoJSON));
        }

        default: {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404 - Not Found</h1>');
        }
      }
    }

    case 'POST': {
      switch (url) {
        case '/pokemon': {
          let body = '';

          // Escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', () => {
            const data = JSON.parse(body);
            data.createdAt = new Date();

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          });
          break;
        }

        default: {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404 - Not Found</h1>');
        }
      }
    }
  }
};

const server = http.createServer(processRequest);

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
