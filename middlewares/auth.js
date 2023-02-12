const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../errors');
const {
  UnauthorizedErrorMessage,
  ForbiddenErrorMessage,
  serverErrorMessage,
} = require('../constants');

const { JWT_SECRET_KEY, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new UnauthorizedError(UnauthorizedErrorMessage));
    } else {
      const token = authorization.replace('Bearer ', '');
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev_secret');
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      throw new ForbiddenError(ForbiddenErrorMessage);
    } else {
      throw new Error(serverErrorMessage);
    }
  }
  req.user = payload;
  next();
};

module.exports = auth;
