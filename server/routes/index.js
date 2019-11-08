const Route = require('express').Router();
const userRoute = require('./userRoute');
const articleRoute = require('./articleRoute');
const msgRoute = require('./msg');
const quoteRoute = require('./quoteRoute');

Route.use('/users', userRoute);
Route.use('/articles', articleRoute);
Route.use('/msg', msgRoute);
Route.use('/quote', quoteRoute);

module.exports = Route;