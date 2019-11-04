const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(10);

module.exports = {
  createVerify (id) {
    let tempId = id.toString()
    return bcryptjs.hashSync(tempId, salt)
  },
  checkVerify (id, verify) {
    return bcryptjs.compareSync(id, verify)
  }
}