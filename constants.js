const OK = 200;
const CREATED = 201;
const BAD_REQUEST_ERR = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN_ERR = 403;
const NOT_FOUND_ERR = 404;
const INTERNAL_SERVER_ERR = 500;
const CONFLICT = 409;

const SALT_ROUNDS = 10;

const notFoudUserMessage = 'Пользователь не найден';
const conflictErrorMessage = 'Пользователь уже существует';
const validationErrorMessage = 'Ошибка валидации';
const notFoundCardMessage = 'Карточка не найдена';
const deleteCardMessage = 'Чужие фильмы удалять нельзя!';
const NoValidCardIdMessage = 'Невалидный id карточки';
const UnauthorizedErrorMessage = 'Необходима авторизация';
const ForbiddenErrorMessage = 'Нет доступа';
const serverErrorMessage = 'Ошибка сервера';
const notFoundErrorMessage = 'Страница не найдена';

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST_ERR,
  UNAUTHORIZED,
  FORBIDDEN_ERR,
  NOT_FOUND_ERR,
  INTERNAL_SERVER_ERR,
  CONFLICT,
  SALT_ROUNDS,
  notFoudUserMessage,
  notFoundCardMessage,
  deleteCardMessage,
  NoValidCardIdMessage,
  conflictErrorMessage,
  validationErrorMessage,
  UnauthorizedErrorMessage,
  ForbiddenErrorMessage,
  serverErrorMessage,
  notFoundErrorMessage,
};
