const User = require('../models/user');
const Article = require('../models/article');
const { decodeToken } = require('../helpers/jwt');

module.exports = {
  authentication (req, res, next) {
    try {
      if(req.headers.token) {
        const decode = decodeToken(req.headers.token);
        const _id = decode.id;
        User.findById({ _id })
          .then(user => {
            req.loggedUser = decode;
            next()
          })
          .catch(next)
      } else {
        throw {msg: 'authen'}
      }
    }
    catch (err) {
      next(err)
    }
  },
  authorizationArticle (req, res, next) {
    try {
      const _id = req.params.id;
      Article.findById({ _id })
        .then(article => {
          if(article.Author == req.loggedUser.id) {
            next()
          } else {
            throw {msg: 'author'}
          }
        })
        .catch(next)
    }
    catch (err) {
      next(err)
    }
  },
  checkForAccept (req, res, next) {
    try{ 
      const _id = req.loggedUser.id;
      const targetId = req.params.id;
      User.findById({ _id })
        .then(user => {
          let pass = false;
          for(let i=0; i<user.RequestIn.length; i++) {
            if(user.RequestIn[i] == targetId){ 
              pass = true
            }
          }
          if(!pass) throw {msg: 'zeroAccept'}
          else {
            next()
          }
        })
        .catch(next)
    }
    catch (err) {
      next(err)
    }
  }
}