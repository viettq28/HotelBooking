const express = require('express');
const cors = require('cors');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const hotelRouter = require('./routes/hotelRoutes');
const userRouter = require('./routes/userRoutes');
const roomRouter = require('./routes/roomRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const User = require('./models/User');

const app = express();

// 1.Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.param('token', async (req, res, next, val) => {
  if (!val) {
    res.status(404).json({
      status: 'fail',
      message: 'Unauthorized'
    })
  } else {
    req.user = await User.findById(val);
    next();
  }
})
// 2.Routes
app.use('/hotel', hotelRouter);
app.use('/user', userRouter);
app.use('/room', roomRouter);
app.use('/:token/transaction', transactionRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
