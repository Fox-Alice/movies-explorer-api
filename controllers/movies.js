const mongoose = require('mongoose');

const Movie = require('../models/Movie');

const {
  OK,
  CREATED,
} = require('../constants');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');

const getMovies = (async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(OK).send(movies);
  } catch (err) {
    next(err);
  }
});

const createMovie = (async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });
    res.status(CREATED).send(await newMovie.save());
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else { next(err); }
  }
});

const deleteMovie = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      next(new NotFoundError('Карточка не найдена'));
    } else if (!movie.owner.equals(req.user._id)) {
      next(new ForbiddenError('Чужие фильмы удалять нельзя!'));
    } else {
      await movie.remove();
      const movies = await Movie.find({});
      res.status(OK).send(movies);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Невалидный id карточки'));
    } else { next(err); }
  }
});

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
