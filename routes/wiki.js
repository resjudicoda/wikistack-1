const express = require('express');
const client = require('../models');
const router = express.Router();
const { addPage, wikiPage, main } = require('../views');
const { Page } = require('../models');


router.get('/', async (req, res, next) => {

  try {

    const pages = await Page.findAll();
    res.send(main(pages));

  } catch (error) { next(error) };
  
});

router.post('/', async (req, res, next) => {

  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) };


  //res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {slug: req.params.slug}
    })
    res.send(wikiPage(page));
  } catch (error) { next(error) };
 
});

module.exports = router;
