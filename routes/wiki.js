const express = require('express');
const client = require('../models');
const router = express.Router();
const { addPage } = require('../views');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', async (req, res, next) => {

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: `posts/${req.body.title}`
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }


  //res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
