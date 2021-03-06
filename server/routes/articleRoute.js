const Route = require('express').Router();
const images = require('../helpers/images')
const articleCont = require('../controllers/articleController');
const { authentication, authorizationArticle } = require('../middlewares/auth');


Route.use(authentication);
Route.get('/one/:id', articleCont.getOneArticle); //* -
Route.get('/public', articleCont.getPublicArticle); //* -
Route.get('/', articleCont.getAuthorArticle); //* -
Route.get('/folArt/:id', articleCont.getFolArticle); //* -
Route.get('/tag/:tag', articleCont.findByTag); //* -

Route.post('/upload', images.multer.single('image'), images.sendUploadToGCS, articleCont.createArticle); //* -

Route.put('/:id', authorizationArticle, articleCont.updateArticle); //* -

Route.patch('/:id', articleCont.likeUnlikeArticle); //* -


Route.delete('/:id', authorizationArticle, articleCont.deleteArticle); //* -

module.exports =Route;