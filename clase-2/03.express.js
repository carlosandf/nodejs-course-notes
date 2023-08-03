const express = require('express');
const dittoJSON = require('./pokemon/ditto.json');

const app = express();

const PORT = process.env.PORT ?? 1235;
app.disable('x-powered-by');

// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next();
//   if (req.headers['content-type'] !== 'application/json') return next();

//   // solo llegan request que son POST y que tienen el header Content-Type: aplication/json
//   let body = '';

//   // escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString();
//   });

//   req.on('end', () => {
//     const data = JSON.parse(body);
//     // mutar la request y meter la información en el req.body
//     req.body = data;
//     next();
//   });
// });

app.use(express.json()); // esta linea hace lo mismo que el código comentado arriba

app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON);
});

app.post('/pokemon', (req, res) => {
  const data = {
    ...req.body,
    createdAt: new Date()
  };
  res.status(201).json(data);
});

app.use((req, res) => {
  res.status(404).send('<h1>404 - No encontrámos lo que buscas :(</h1>');
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
