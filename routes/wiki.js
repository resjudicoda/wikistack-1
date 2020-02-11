const express = require('express');
const client = require('../models');
const router = express.Router();
const { addPage, wikiPage, main } = require('../views');
const { Page, User } = require('../models');


router.get('/', async (req, res, next) => {

  try {

    const pages = await Page.findAll();
    res.send(main(pages));

  } catch (error) { next(error) };
  
});

router.post('/', async (req, res, next) => {

  try {

    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    });
  
    const page = await Page.create(req.body);
  
    page.setAuthor(user);
  
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
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
  } catch (error) { next(error) };
 
});

module.exports = router;
