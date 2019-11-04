const User = require('../models/user');
const { comparePassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');
const mongoose = require('mongoose');

module.exports = {
  findAllUser (req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(next)
  },
  getProfileUser (req, res, next) {
    const _id = req.params.id;
    User.findById({ _id }).populate('Following').populate('Followers').populate('RequestIn').populate('RequestOut')
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  },
  signup (req, res, next) {
    const {username, password, email, status} = req.body;
    User.create({username, password, email, status})
      .then(user => {
        const payload = {
          id: user._id,
          username: user.username,
          email: user.email
        }
        const signupToken = signToken(payload)
        res.status(200).json({msg: 'user created!', user, token: signupToken})
      })
      .catch(next)
  },
  signin (req, res, next) {
    const {email, password} = req.body;
    User.findOne({ email })
      .then(user => {
        if(user && comparePassword(password, user.password)) {
          const payload = {
            id: user._id,
            email: user.email,
            username: user.username
          }
          const signinToken = signToken(payload)
          res.status(200).json({ token: signinToken })
        } else {
          throw {msg: 'wrong'}
        }
      })
      .catch(next)
  },
  checkPrivate (req, res, next) {
    const _id = req.params.id;
    User.findById({ _id })
      .then(user => {
        if(user._id == req.loggedUser.id) throw {msg: 'checkSelf'}
        else {
          res.status(200).json({status: user.status})
        }
      })
      .catch(next)
  },
  followingStatusFalse (req, res, next) { //can follow / unfollow
    const _id = req.params.id;
    User.findById({ _id })
      .then(user => {
        let pass = true;
        for(let i=0; i<user.Followers.length; i++) {
          if(user.Followers[i] == req.loggedUser.id) {
            pass = false
          }
        }
        let id = new mongoose.Types.ObjectId(req.loggedUser.id)
        if(!pass) {
          return User.findByIdAndUpdate({ _id }, {$pull: {Followers: id}})
        } else {
          return User.findByIdAndUpdate({ _id }, {$push: {Followers: id}})
        }
      })
      .then((a) => {
        let _id = new mongoose.Types.ObjectId(req.loggedUser.id);
        let targetId = new mongoose.Types.ObjectId(req.params.id);
        if(a.Followers.length == 0) {
          return User.findByIdAndUpdate({ _id }, {$push: {Following: targetId}})
        } else {
          return User.findByIdAndUpdate({ _id }, {$pull: {Following: targetId}})
        }
      })
      .then((a) => {
        if(a.Following.length == 0) {
          res.status(200).json({msg: 'Following Success!'})
        } else {
          res.status(200).json({ msg: 'Unfollowing Success' })
        }
      })
      .catch(next)
  },
  followingStatusTrue (req, res, next) {
    const _id = req.params.id;
    User.findById({ _id })
      .then(user => {
        let pass = true;
        for(let i=0; i<user.RequestIn.length; i++ ) {
          if(user.RequestIn[i] == req.loggedUser.id) {
            pass = false;
          }
        }
        let id = new mongoose.Types.ObjectId(req.loggedUser.id)
        if(!pass) {
          console.log('fist step up')
          return User.findByIdAndUpdate({ _id }, {$pull: {RequestIn: id}})
        } else {
          console.log('first step down')
          return User.findByIdAndUpdate({ _id }, {$push: {RequestIn: id}})
        }
      })
      .then((a) => {
        const _id = new mongoose.Types.ObjectId(req.loggedUser.id)
        const targetId = new mongoose.Types.ObjectId(req.params.id)
        if(a.RequestIn.length == 0) {
          console.log('second step up')
          return User.findByIdAndUpdate({ _id }, {$push: {RequestOut: targetId}})
        } else {
          console.log('second step down')
          return User.findByIdAndUpdate({ _id }, {$pull: {RequestOut: targetId}})
        }
      })
      .then((a) => {
        if(a.RequestOut.length == 0) {
          console.log('third step up')
          res.status(200).json({msg: 'Your request has been sent!'})
        } else {
          console.log('thrid step down')
          res.status(200).json({msg: 'Your request has been canceled!'})
        }
      })
      .catch(next)
  },
  acceptRequest (req, res, next) {
    const _id = req.loggedUser.id;
    const targetId = new mongoose.Types.ObjectId(req.params.id)
    User.findByIdAndUpdate({ _id }, {$pull: {RequestIn: targetId}})
      .then(() =>{
        return User.findByIdAndUpdate({ _id }, {$push: {Followers: targetId}})
      })
      .then(() => {
        let incomingId = new mongoose.Types.ObjectId(req.loggedUser.id)
        return User.findByIdAndUpdate({ _id: targetId}, {$pull: {RequestOut: incomingId}})
      })
      .then(() => {
        let incomingId = new mongoose.Types.ObjectId(req.loggedUser.id)
        return User.findByIdAndUpdate({ _id: targetId}, {$push: {Following: incomingId}})
      })
      .then(() => {
        res.status(200).json({msg: 'accepted!'})
      })
      .catch(next)
  },
  declineRequest (req, res, next) {
    const _id = req.loggedUser.id
    const targetId = new mongoose.Types.ObjectId(req.params.id);
    User.findByIdAndUpdate(_id, {$pull: {RequestIn: targetId}})
      .then(() => {
        let id = new mongoose.Types.ObjectId(req.loggedUser.id)
        return User.findByIdAndUpdate({ _id: req.params.id }, {$pull: {RequestOut: id}})
      })
      .then(() => {
        res.status(200).json({msg: 'Decline the Request'})
      })
      .catch(next)
  }
}