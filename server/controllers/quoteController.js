const axios = require('axios');

module.exports = {
  getQuote (req, res, next) {
    axios({
      mehtod: 'get',
      url: 'https://favqs.com/api/qotd',
      headers: {
        Authorization: 'token	0434e600b4897cd9fc14e58a6299a8fd'
      }
    })
      .then(({data}) => {
        res.status(200).json({author: data.quote.author, body: data.quote.body})
      })
      .catch(next)
  }
}