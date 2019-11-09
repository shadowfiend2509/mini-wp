module.exports = (err, req, res, next) => {
  console.log(err)
  if(err.msg == 'wrong') {
    res.status(400).json({msg: 'email/password wrong'});
  } else if(err.errors && err.errors.password) {
    res.status(400).json({msg: err.errors.password.message})
  } else if(err.errors && err.errors.username) {
    res.status(400).json({msg: err.errors.username.message})
  } else if(err.errors && err.errors.email) {
    res.status(400).json({msg: err.errors.email.message})
  } else if(err.errors && err.errors.title) {
    res.status(400).json({msg: err.errors.title.message})
  } else if(err.errors && err.errors.content) {
    res.status(400).json({msg: err.errors.content.message})
  } else if(err.errors && err.errors.featured_image) {
    res.status(400).json({msg: err.errors.featured_image.message})
  } else if(err.msg == 'authen') {
    res.status(403).json({msg: 'Authentication Error'});
  } else if(err.msg == 'author') {
    res.status(401).json({msg: 'Authorization Error!'});
  } else if(err.msg == 'empty') {
    res.status(400).json({msg: 'cannot Update with empty value'})
  } else if(err.port == 443) {
    res.status(400).json({msg: 'Article need Image / Problem with GCS'})
  } else if(err.kind == 'ObjectId') {
    res.status(404).json({msg: 'The searched id was not found'})
  } else if(err.name == 'JsonWebTokenError') {
    res.status(403).json({msg: err.message});
  } else if(err.msg == 'Unfollow') {
    res.status(200).json({msg: 'Unfollow Success'});
  } else if(err.msg == 'checkSelf') {
    res.status(403).json({msg: 'Cant check yourSelf'})
  } else if(err.msg == 'zeroAccept') {
    res.status(404).json({msg: 'Target Not Found!'})
  } else if(err.msg == 'codee') {
    res.status(403).json({msg: 'Wrong code / exp Code Verify Check your Email or request again'})
  } else if(err.msg == 'expV') {
    res.status(400).json({msg: 'Exp Verify please try again'})
  } else if(err.msg == 'none') {
    res.status(404).json({msg: 'Email not registered!'})
  } else if(err.code == 11000 ) {
    res.status(403).json({msg: 'The Email allready used!'})
  }
  else {
    res.status(500).json({msg: 'Internal Server Error'});
  }
}