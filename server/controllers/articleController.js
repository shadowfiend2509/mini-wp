const Article = require('../models/article');
const User = require('../models/user');


module.exports = {
  getOneArticle (req, res, next) {
    const id = req.params.id;
    Article.findById(id).populate('Author')
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  },
  getPublicArticle (req, res, next) {
    Article.find().populate("Author").sort([['createdAt', 'descending']])
      .then(articles => {
        let temp = []
        for(let i=0; i<articles.length; i++) {
          if(!articles[i].Author.status) {
            temp.push(articles[i])
          }
        }
        res.status(200).json(temp)
      })
      .catch(next)
  },
  getAuthorArticle (req, res, next) {
    const Author = req.loggedUser.id;
    Article.find({ Author }).populate('Author').sort([['createdAt', 'descending']])
      .then(articles => {
        res.status(200).json(articles);
      })
      .catch(next)
  },
  getFolArticle (req, res, next) {
    const Author = req.params.id;
    Article.find({ Author }).populate('Author')
      .then(articles => {

        res.status(200).json(articles)
      })
      .catch(next)
  },
  updateArticle (req, res, next) {
    const _id = req.params.id;
    const { title, content, tags } = req.body;
    if(!title, !content) throw {msg: 'empty'} 
    else {
      Article.findByIdAndUpdate({ _id }, { title, content, tags }, {new: true})  
        .then((article) => {
          res.status(201).json(article)
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
    const newtags = req.body.tags;
    const tags = newtags.split(',')
    const { title, content } = req.body;
    const url = req.file.cloudStoragePublicUrl;
    const Author = req.loggedUser.id;
    Article.create({ title, content, tags, featured_image: url, Author })
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
  },
  findByTag (req, res, next) {
    const tag = req.params.tag;
    Article.find().populate('Author').sort([['createdAt', 'descending']])
      .then(articles => {

        let temp = [];
        articles.forEach((el, i) => {
          console.log(el.tags)
          for(let i=0; i<el.tags.length; i++) {
            if(el.tags[i] == tag && !el.Author.status) {
              temp.push(el)
            }
          }
        })
        console.log(temp)
        res.status(200).json({article: temp})
      })
      .catch(next)
  }
}
