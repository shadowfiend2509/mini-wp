const Route = require('express').Router();
const userCont = require('../controllers/userController');
const { authentication, checkForAccept } = require('../middlewares/auth');
const images = require('../helpers/images')

Route.post('/signup', userCont.signup); //* -
Route.post('/signin', userCont.signin); //* -
Route.post('/signinG', userCont.signinG)

Route.post('/confirm/verify', userCont.resetPasswordVerify); //* -
Route.patch('/confirm', userCont.confirmVerify); //* -
Route.patch('/changepass', userCont.changePassword); // * -

Route.use(authentication)

Route.get('/', userCont.findAllUser); //* -
Route.get('/find/login', userCont.getLoginProfile); //* -
Route.get('/:id', userCont.getProfileUser); //* - 
Route.get('/getId/fol', userCont.getFolId); //* -

Route.get('/status/:id', userCont.checkPrivate); //* -
Route.patch('/change/status', userCont.changeStatus); //* -
Route.patch('/upload', images.multer.single('image'), images.sendUploadToGCS, userCont.updateImage); //* -
Route.patch('/status/public/:id', userCont.followingStatusFalse); //* -
Route.patch('/status/private/:id', userCont.followingStatusTrue); //* -

Route.patch('/status/accept/:id', checkForAccept, userCont.acceptRequest); //* -
Route.patch('/status/decline/:id', checkForAccept, userCont.declineRequest); //* -


module.exports = Route;