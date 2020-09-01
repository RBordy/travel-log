const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middleware = require('./middleware');
const tlogs = require('./api/tlogs');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/tlogs', tlogs);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost: ${PORT}`);
});
