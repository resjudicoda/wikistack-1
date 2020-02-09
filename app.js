const express = require('express');
const morgan = require('morgan');
const path = require('path');
const layout = require('./views/layout');
const { db } = require('./models');
const models = require('./models');

const app = express();
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(layout(''));
});

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 3000;

const init = async () => {
  await models.User.sync()
  await models.Page.sync()

  app.listen(PORT, () => {
    console.log(`Console is listening on ${PORT}`);
  });
}

init();


