const express = require('express');

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT ?? 12345;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hola Mundo' });
});

app.listen(PORT, () => {
  if (process.env.ENV === 'PROD') {
    console.log(`Server listening on port ${PORT}`);
  } else {
    console.log(`Server listening on http://localhost:${PORT}`);
  }
});
