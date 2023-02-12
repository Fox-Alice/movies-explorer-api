const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateRegisterBody = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .messages({
        'string.email': 'Некорректная почта',
        'any.required': 'Обязательное поле',
      }),
    password: Joi
      .string()
      .required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .messages({
        'string.email': 'Некорректная почта',
        'any.required': 'Обязательное поле',
      }),
    password: Joi
      .string()
      .required()
      .messages({
        'string.min': 'Минимальная длина пароля 2 символа',
        'string.max': 'Максимальная длина пароля 30 символов',
        'any.required': 'Обязательное поле',
      }),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
  }),
});

const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(
        'Некорректная ссылка на изображение',
      );
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(
        'Некорректная ссылка на видео',
      );
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(
        'Некорректная ссылка на изображение',
      );
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
});

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный idшник');
    }),
  }),
});

module.exports = {
  validateMovieInfo,
  validateRegisterBody,
  validateLoginBody,
  validateUpdateProfile,
  validateObjectId,
};
