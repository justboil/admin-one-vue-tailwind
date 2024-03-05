var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');
var workersRouter = require('./routes/workers');
var transactionsRouter = require('./routes/transactions');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/xarxa', membersRouter);
app.use('/api/workers', workersRouter);
app.use('/api/transactions', transactionsRouter);
module.exports = app;
