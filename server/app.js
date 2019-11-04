if(process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const index = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
  .then(() => console.log('Mongodb Now Connected!'))
  .catch(console.log)

app.use('/', index);

app.use(errorHandler);

http.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));