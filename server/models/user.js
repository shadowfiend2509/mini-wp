const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const { hashPassword } = require('../helpers/hash');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  email: {
    type: String,
    required: [true, 'email is required!'],
    unique: [true, 'email is allready used!']
  },
  Followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  Following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  RequestIn: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  RequestOut: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  status: Boolean,
  createdAt: Date
})

UserSchema.pre('save', function (next) {
  this.password = hashPassword(this.password);
  const date = new Date();
  this.createdAt = date.toLocaleString();
  if(this.status == undefined){
    this.status = false;
  } else {
    this.status = this.status
  }
  this.Followers = [];
  this.Following = [];
  this.RequestIn = [];
  this.RequestOut = [];
  next()
})

const User = Mongoose.model('users', UserSchema)

module.exports = User;