const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateRegisterBody, validateLoginBody } = require('../middlewares/validation');

const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../errors');

router.use('/signin', validateLoginBody, login);

router.use('/signup', validateRegisterBody, createUser);

router.use('/users', auth, userRouter);

router.use('/movies', auth, movieRouter);

router.use('/*', auth, ((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
}));

module.exports = router;
