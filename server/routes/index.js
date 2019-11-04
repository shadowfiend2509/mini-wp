const Route = require('express').Router();
const userRoute = require('./userRoute');
const articleRoute = require('./articleRoute');

Route.use('/users', userRoute);
Route.use('/articles', articleRoute);

module.exports = Route;