const User = require('../models/user'),
  { comparePassword, hashPassword } = require('../helpers/hash'),
  { signToken } = require('../helpers/jwt'),
  { createVerify, checkVerify } = require('../helpers/logicVerify'),
  { sendMail } = require('../helpers/sendMail'),
  mongoose = require('mongoose'),
  { OAuth2Client } = require('google-auth-library')

module.exports = {
  signinG (req, res, next) {
    let username = null;
    let email = null;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENTID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        username = payload.name;
        email = payload.email
        return User.findOne({ email })
      })
      .then(user => {
        let temp = ''
        for(let i=0; i<5; i++) {
          let alfa = 'abeuedwkmsapdmarkqorprqwokqwpo'
          let rand = Math.floor(Math.random() * alfa.length)
          temp += alfa[rand]
        }
        if(user) return user
        else return User.create({ username, password: temp, email })
      })
      .then(user => {
        const serverToken = signToken({
          id: user._id,
          email: user.email,
          username: user.username
        })
        res.status(200).json({token: serverToken, user})
      })
      .catch(next)
  },
  findAllUser (req, res, next) {
    const email = req.loggedUser.email
    User.find()
      .then(users => {
        let temp = [];
        for(let i=0; i<users.length; i++) {
          if(users[i].email !== email) {
            temp.push(users[i])
          }
        }
        res.status(200).json(temp);
      })
      .catch(next)
  },
  getFolId (req, res, next) {
    const id = req.loggedUser.id;
    User.findById(id).populate('Following')
      .then(user => {
        res.status(200).json({id: user.Following})
      })
      .catch(next)
  },
  getLoginProfile (req, res, next) {
    const _id = req.loggedUser.id;
    User.findById({ _id }).populate('Following').populate('Followers').populate('RequestIn').populate('RequestOut')
      .then(user => {
        res.status(200).json(user)
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
    const {username, password, email} = req.body;
    User.create({username, password, email})
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
    const {signuser, password} = req.body;
    User.findOne({ $or: [{username: signuser}, {email: signuser}] }).populate('Following').populate('Followers')
      .then(user => {
        if(user && comparePassword(password, user.password)) {
          const payload = {
            id: user._id,
            email: user.email,
            username: user.username
          }
          const signinToken = signToken(payload)
          res.status(200).json({ token: signinToken, user })
        } else {
          throw {msg: 'wrong'}
        }
      })
      .catch(next)
  },
  changeStatus (req, res, next) {
    User.findById({ _id: req.loggedUser.id })
      .then(user => {
        if(user.status) {
          return User.findByIdAndUpdate({ _id: req.loggedUser.id }, { status: false })
        } else {
          return User.findByIdAndUpdate({ _id: req.loggedUser.id }, { status: true })
        }
      })
      .then(() => {
        res.status(200).json({msg: 'success'})
      })
      .catch(next)
  },
  updateImage (req, res, next) {
    const url = req.file.cloudStoragePublicUrl;
    User.findByIdAndUpdate({ _id: req.loggedUser.id }, {image: url})
      .then(user => {
        res.status(200).json({ url })
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
    let pass = true
    User.findById({ _id })
      .then(user => {
        for(let i=0; i<user.Followers.length; i++) {
          if(user.Followers[i] == req.loggedUser.id) {
            pass = false
          }
        }
        let id = new mongoose.Types.ObjectId(req.loggedUser.id)
        if(!pass) {
          return User.findByIdAndUpdate({ _id }, {$pull: {Followers: id}}, {new: true})
        } else {
          return User.findByIdAndUpdate({ _id }, {$push: {Followers: id}}, {new: true})
        }
      })
      .then((a) => {
        let _id = new mongoose.Types.ObjectId(req.loggedUser.id);
        let targetId = new mongoose.Types.ObjectId(req.params.id);
        if(!pass) {
          return User.findByIdAndUpdate({ _id }, {$pull: {Following: targetId}})
        } else {
          return User.findByIdAndUpdate({ _id }, {$push: {Following: targetId}})
        }
      })
      .then((a) => {
        if(!pass) {
          res.status(200).json({msg: 'Unfollowing!'})
        } else {
          res.status(200).json({ msg: 'Following' })
        }
      })
      .catch(next)
  },
  followingStatusTrue (req, res, next) {
    const _id = req.params.id;
    let pass = true
    User.findById({ _id })
      .then(user => {
        for(let i=0; i<user.RequestIn.length; i++ ) {
          if(user.RequestIn[i] == req.loggedUser.id) {
            pass = false;
          }
        }
        let id = new mongoose.Types.ObjectId(req.loggedUser.id)
        if(!pass) {
          return User.findByIdAndUpdate({ _id }, {$pull: {RequestIn: id}})
        } else {
          return User.findByIdAndUpdate({ _id }, {$push: {RequestIn: id}})
        }
      })
      .then((a) => {
        const _id = new mongoose.Types.ObjectId(req.loggedUser.id)
        const targetId = new mongoose.Types.ObjectId(req.params.id)
        if(!pass) {
          return User.findByIdAndUpdate({ _id }, {$pull: {RequestOut: targetId}})
        } else {
          return User.findByIdAndUpdate({ _id }, {$push: {RequestOut: targetId}})
        }
      })
      .then((a) => {
        if(pass) {
          res.status(200).json({msg: 'Your request has been sent!'})
        } else {
          res.status(200).json({msg: 'Your request has been canceled!'})
        }
      })
      .catch(next)
  },
  acceptRequest (req, res, next) {
    const _id = req.loggedUser.id;
    const targetId = new mongoose.Types.ObjectId(req.params.id);
    let tempUser = null
    User.findByIdAndUpdate({ _id }, {$pull: {RequestIn: targetId}})
      .then(() =>{
        return User.findByIdAndUpdate({ _id }, {$push: {Followers: targetId}}, {new: true})
      })
      .then((user) => {
        tempUser = user
        let incomingId = new mongoose.Types.ObjectId(req.loggedUser.id)
        return User.findByIdAndUpdate({ _id: targetId}, {$pull: {RequestOut: incomingId}})
      })
      .then(() => {
        let incomingId = new mongoose.Types.ObjectId(req.loggedUser.id)
        return User.findByIdAndUpdate({ _id: targetId}, {$push: {Following: incomingId}})
      })
      .then(() => {
        res.status(200).json({msg: 'accepted!', user: tempUser})
      })
      .catch(next)
  },
  declineRequest (req, res, next) {
    const _id = req.loggedUser.id
    const targetId = new mongoose.Types.ObjectId(req.params.id);
    User.findByIdAndUpdate(_id, {$pull: {RequestIn: targetId}})
      .then(() => {
        let id = new mongoose.Types.ObjectId(req.loggedUser.id)
        return User.findByIdAndUpdate({ _id: req.params.id }, {$pull: {RequestOut: id}}, {new: true})
      })
      .then((user) => {
        res.status(200).json({msg: 'Decline the Request', user})
      })
      .catch(next)
  },
  resetPasswordVerify (req, res, next) {
    const email = req.body.email
    User.findOne({ email })
      .then(user => {
        const sendVerify = createVerify(user._id)
        return sendMail(email, {
          msg: `your verify code is => ${sendVerify}`
        }, {
          subject: `Reset Password Verify`
        })
      })
      .then(({msg}) => {
        res.status(200).json({ msg })
      })
      .catch(next)
  },
  confirmVerify (req, res, next) {
    const email = req.body.email
    const verify = req.body.verify
    User.findOne({ email })
      .then(user => {
        let pass = false;
        if(user && checkVerify(user._id.toString(), verify)) {
          pass = true;
        }
        if(!pass) throw {msg: 'codee'}
        else {
          statusPass = true;
          res.status(200).json({ status: true })
        }
      })
      .catch(next)
  },
  changePassword (req, res, next) {
    const email = req.body.email;
    const newPass = req.body.newpass;
    User.findOneAndUpdate({ email }, { password: hashPassword(newPass) })
      .then(user => {
        res.status(200).json({msg: 'your password success updated!', user})
      })
      .catch(next)
  }
}
