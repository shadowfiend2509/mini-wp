const Route = require('express').Router();
const images = require('../helpers/images')
const articleCont = require('../controllers/articleController');
const { authentication, authorizationArticle } = require('../middlewares/auth');



Route.use(authentication);
Route.get('/', articleCont.getAuthorArticle);
Route.get('/getId', articleCont.getFolId); // waktu di client jadikan promise
Route.get('/folArt/:id', articleCont.getFolArticle);

Route.post('/upload', images.multer.single('image'), images.sendUploadToGCS, articleCont.createArticle);

Route.put('/:id', images.multer.single('image'), images.sendUploadToGCS, authorizationArticle, articleCont.updateArticle);

Route.patch('/:id', articleCont.likeUnlikeArticle);


Route.delete('/:id', authorizationArticle, articleCont.deleteArticle);

module.exports =Route;