const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./validations/movieSchema.js');

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:12345'
    ];

    console.log({ origin });
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, origin);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.static('public'));

// obtener todas las peliculas o filtrar por genero
app.get('/movies', (req, res) => {
  /* Cofiguración para CORS
  const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  */

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
    id: crypto.randomUUID(),
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
  const result = await validatePartialMovie(req.body);

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

  movies[movieIndex] = updateMovie;

  res.status(200).json(updateMovie);
});

app.delete('/movies/:id', (req, res) => {
  /* Cofiguración para CORS
  const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  */

  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);

  res.json({ message: 'Movie deleted' });
});

// Configuración para CORS
/*
app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'DELETE']);
  }

  res.sendStatus(200);
});
*/

const PORT = process.env.PORT ?? 12345;

app.listen(PORT, () => {
  if (process.env.ENV === 'PROD') {
    console.log(`Server listening on port ${PORT}`);
  } else {
    console.log(`Server listening on http://localhost:${PORT}`);
  }
});
