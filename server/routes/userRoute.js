const Route = require('express').Router();
const userCont = require('../controllers/userController');
const { authentication, checkForAccept } = require('../middlewares/auth');

Route.get('/', userCont.findAllUser);
Route.get('/:id', userCont.getProfileUser);
Route.post('/signup', userCont.signup);
Route.post('/signin', userCont.signin);

Route.get('/status/:id', authentication, userCont.checkPrivate);
Route.patch('/status/public/:id', authentication, userCont.followingStatusFalse);
Route.patch('/status/private/:id', authentication, userCont.followingStatusTrue);

Route.patch('/status/accept/:id', authentication, checkForAccept, userCont.acceptRequest);
Route.patch('/status/decline/:id', authentication, checkForAccept, userCont.declineRequest);

module.exports = Route;