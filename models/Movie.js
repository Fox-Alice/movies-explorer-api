const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Необходимо ввести корректную ссылку на изображение',
    },
    type: String,
    required: true,
  },
  trailerLink: {
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Необходимо ввести корректную ссылку на видео',
    },
    type: String,
    required: true,
  },
  thumbnail: {
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Необходимо ввести корректную ссылку на изображение',
    },
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('movie', userSchema);
