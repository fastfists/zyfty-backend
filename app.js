const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const nftRouter = require('./routes/nft');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
app.use('/user/', usersRouter);
app.use('/nft/', nftRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Not found");
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(5000, () => console.log('Listening on port 5000'))
module.exports = app;
