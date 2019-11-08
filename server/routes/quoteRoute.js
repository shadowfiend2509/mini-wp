const Route = require('express').Router();
const quoteController = require('../controllers/quoteController');

Route.get('/', quoteController.getQuote);

module.exports = Route;