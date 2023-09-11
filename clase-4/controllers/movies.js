import { validateMovie, validatePartialMovie } from '../validations/movieSchema.js';
import { MovieModel } from '../models/local-file-system/movie.js';

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.status(200).json(movies);
  }

  static async getById (req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });

    if (movie) return res.json(movie);

    res.status(404).json({ message: 'Movie not found' });
  }

  static async create (req, res) {
    const result = await validateMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await MovieModel.create({ input: result.data });

    res.status(201).json(newMovie);
  }

  static async delete (req, res) {
    const { id } = req.params;

    const deleted = await MovieModel.delete({ id });

    if (!deleted) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted' });
  }

  static async update (req, res) {
    const result = await validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updateMovie = await MovieModel.update({ id, input: result.data });

    if (!updateMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(updateMovie);
  }
}
