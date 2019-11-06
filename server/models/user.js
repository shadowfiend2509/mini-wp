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
  image: String,
  status: Boolean,
  createdAt: Date,
  color: String
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
  this.image = 'https://storage.cloud.google.com/newminiwp/1573039401172blue-profile-1-e1538567682109.png?authuser=1'
  this.Followers = [];
  this.Following = [];
  this.RequestIn = [];
  this.RequestOut = [];
  let temp = ['dark', 'warning', 'primary', 'secondary', 'warning', 'danger', 'info', 'indigo', 'light'];
  let rand = Math.floor(Math.random() * temp.length);
  this.color = temp[rand]
  next()
})

const User = Mongoose.model('users', UserSchema)

module.exports = User;