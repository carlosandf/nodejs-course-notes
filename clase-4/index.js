import express from 'express';
import { randomUUID } from 'node:crypto';
import { validateMovie, validatePartialMovie } from './validations/movieSchema.js';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const movies = require('./movies.json');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

const PORT = process.env.PORT ?? 12345;

app.use(express.static('public'));

// obtener todas las peliculas o filtrar por genero
app.get('/movies', (req, res) => {
  const { genre } = req.query;

  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.status(200).json(movies);
});

// GET ONE BY ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);

  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Movie not found' });
});

app.post('/movies', async (req, res) => {
  const result = await validateMovie(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: randomUUID(),
    ...result.data
  };

  /*
    Esto NO es REST, porque estamos guardando
    el estado de la aplicación en memoria
  */
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

// Actualizar una pelicula
app.patch('/movies/:id', async (req, res) => {
  const result = await validatePartialMovie(req.params);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  };

  console.log({ updateMovie });
  movies[movieIndex] = updateMovie;

  res.status(200).json(updateMovie);
});

app.listen(PORT, () => {
  if (process.env.ENV === 'PROD') {
    console.log(`Server listening on port ${PORT}`);
  } else {
    console.log(`Server listening on http://localhost:${PORT}`);
  }
});
