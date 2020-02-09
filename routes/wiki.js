const express = require('express');
const client = require('../models');
const router = express.Router();
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  res.send('x');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
