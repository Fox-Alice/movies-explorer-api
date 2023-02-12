const express = require('express');
const {
  getUser,
  updateProfile,
} = require('../controllers/users');

const { validateUpdateProfile } = require('../middlewares/validation');

const userRouter = express.Router();

userRouter.get('/me', getUser);
userRouter.patch('/me', validateUpdateProfile, updateProfile);

module.exports = userRouter;
