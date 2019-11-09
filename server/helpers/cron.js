const cron = require('node-cron');
const Msg = require('../models/message');

cron.schedule('* * 1 * * *', function () {
  Msg.deleteMany()
    .then(() => {
      console.log(`success delete all message`)
    })
    .catch(console.log)
})