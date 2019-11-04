const Article = require('../models/article');
const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
  getAuthorArticle (req, res, next) {
    const Author = req.loggedUser.id;
    Article.find({ Author })
      .then(articles => {
        res.status(200).json(articles);
      })
      .catch(next)
  },
  getFolId (req, res, next) {
    const id = req.loggedUser.id;
    User.findById(id)
      .then(user => {
        res.status(200).json({id: user.Following})
      })
      .catch(next)
  },
  getFolArticle (req, res, next) {
    const Author = req.params.id;
    Article.find({ Author })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  },
  updateArticle (req, res, next) {
    const _id = req.params.id;
    const url = req.file.cloudStoragePublicUrl;
    const { title, content } = req.body;
    if(!title, !content) throw {msg: 'empty'} 
    else {
      Article.findByIdAndUpdate({ _id }, { title, content, featured_image: url })  
        .then(() => {
          res.status(201).json({msg: 'success updated'})
        })
        .catch(next);
    }
  },
  likeUnlikeArticle (req, res, next) {
    const id = req.params.id;
    const loginUser = req.loggedUser.id
    let pass = true
    Article.findById(id)
      .then(article => {
        for(let i=0; i<article.Likes.length; i++) {
          if(article.Likes[i] == req.loggedUser.id) pass = false;
        }
        if(!pass) {
          return Article.findByIdAndUpdate(id, {$pull: {Likes: loginUser}});
        } else {
          return Article.findByIdAndUpdate(id, {$push: {Likes: loginUser}});
        }
      })
      .then(() => {
        if(!pass) res.status(200).json({msg: 'UnLike'})
        else res.status(200).json({msg: 'Like'})
      })
      .catch(next)
  },
  createArticle (req, res, next) {
    const { title, content } = req.body;
    const url = req.file.cloudStoragePublicUrl;
    const Author = req.loggedUser.id;
    Article.create({ title, content, featured_image: url, Author })
      .then(article => {
        res.status(201).json({msg: 'created!', article})
      })
      .catch(next);
  },
  deleteArticle (req, res, next) {
    const _id = req.params.id;
    Article.findByIdAndDelete({ _id })
      .then(() => {
        res.status(200).json({msg: 'article deleted!'})
      })
      .catch(next)
  },
  addTags (req, res, next) {
    const tag = req.body.tag;
    const id = req.params.id
    Article.findByIdAndUpdate(id, {$push: {Tags: tag}})
      .then(() => {
        res.status(200).json({msg: 'added Tags'});
      })
      .catch(next)
  }
}