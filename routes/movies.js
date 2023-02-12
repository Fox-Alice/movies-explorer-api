const express = require('express');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateMovieInfo, validateObjectId } = require('../middlewares/validation');

const movieRouter = express.Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovieInfo, createMovie);
movieRouter.delete('/:id', validateObjectId, deleteMovie);

module.exports = movieRouter;
