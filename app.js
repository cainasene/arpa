require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

const dbConnection = require('./config/database')
dbConnection()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const user = require('./routes/user')
app.use('/user', user)

const assignment = require('./routes/assignment')
app.use('/assignment', assignment)

module.exports = app;