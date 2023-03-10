const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const { errors } = require('celebrate');

const cors = require('cors');

const router = require('./routes');

const errorHandler = require('./middlewares/errors-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { rateLimiter } = require('./middlewares/rateLimiter');

mongoose.set('strictQuery', true);

dotenv.config();

const { PORT = 4000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use(rateLimiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

async function connectDB() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  });
  app.listen(PORT);
}
connectDB();
