const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  content: {
    type: String,
    required: [true, 'content is required!']
  },
  Author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  featured_image: {
    type: String,
    required: [true, 'The article need Image!']
  },
  tags: [],
  Likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  createdAt: Date
})

ArticleSchema.pre('save', function (next) {
  const date = new Date();
  this.Tags = [];
  this.Likes = [];
  this.createdAt = date.toLocaleString();
  next();
})

const Article = Mongoose.model('articles', ArticleSchema);

module.exports = Article;