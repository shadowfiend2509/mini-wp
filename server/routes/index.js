const Route = require('express').Router();
const userRoute = require('./userRoute');
const articleRoute = require('./articleRoute');
const msgRoute = require('./msg');

Route.use('/users', userRoute);
Route.use('/articles', articleRoute);
Route.use('/msg', msgRoute);

module.exports = Route;