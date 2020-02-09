const express = require('express');
const morgan = require('morgan');
const path = require('path');
const layout = require('./views/layout');
const { db } = require('./models');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send(layout(''));
});

db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 3000;

const init = async () => {
  await models.User.sync();
  await models.Page.sync();

  app.listen(PORT, () => {
    console.log(`Console is listening on ${PORT}`);
  });
};

init();
