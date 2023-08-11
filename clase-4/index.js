import express from 'express';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(corsMiddleware());

app.use(express.static('public'));

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 12345;

app.listen(PORT, () => {
  if (process.env.ENV === 'PROD') {
    console.log(`Server listening on port ${PORT}`);
  } else {
    console.log(`Server listening on http://localhost:${PORT}`);
  }
});
