const express = require('express');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const { validateMovie } = require('./validations/movieSchema.js');

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

// TODO: Acualizar una pelicula -> Pending

app.listen(PORT, () => {
  if (process.env.ENV === 'PROD') {
    console.log(`Server listening on port ${PORT}`);
  } else {
    console.log(`Server listening on http://localhost:${PORT}`);
  }
});
