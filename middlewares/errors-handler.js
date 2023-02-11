const { serverErrorMessage } = require('../constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || serverErrorMessage;
  res.status(statusCode).send({ error: errMessage });
  next();
};

module.exports = errorHandler;
