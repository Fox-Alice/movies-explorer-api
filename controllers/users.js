const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/User');

const generateToken = require('../utils/jwt');

const {
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require('../errors');

const {
  OK,
  CREATED,
  SALT_ROUNDS,
  notFoudUserMessage,
  conflictErrorMessage,
  validationErrorMessage,
} = require('../constants');

const getUser = (async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(notFoudUserMessage);
    } else {
      res.status(OK).send(user);
    }
  } catch (err) {
    next(err);
  }
});

const updateProfile = (async (req, res, next) => {
  try {
    const user = await User
      .findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        about: req.body.about,
      }, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError(notFoudUserMessage);
    } else {
      res.status(OK).send(user);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(`${err.message}`));
    } else { next(err); }
  }
}
);

const createUser = (async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await new User({
      name, email, password: hash,
    });

    await newUser.save();
    res.status(CREATED).send({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(conflictErrorMessage));
    } else if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(validationErrorMessage));
    } else { next(err); }
  }
}
);

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+ password');
    if (!user) {
      throw new UnauthorizedError('Неправильный логин или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new UnauthorizedError('Неправильный логин или пароль');
    }
    const token = generateToken({ _id: user._id });
    res.status(OK).send({ message: 'Welcome!', token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  createUser,
  updateProfile,
  login,
};
