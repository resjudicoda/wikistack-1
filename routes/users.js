const express = require('express');
const client = require('../models');
const router = express.Router();
const { userList, userPages } = require('../views');
const { User, Page } = require('../models');

router.get('/', async (req, res, next) => {

  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) { next(error) };
  
});

router.get('/:userId', async (req, res, next) => {

    try {
      const user = await User.findAll({
        where: {id: req.params.userId}
      });
      const pages = await Page.findAll({
        where: {authorId: req.params.userId}
      });
      res.send(userPages(user, pages));

    } catch (error) { next(error) };
  })

module.exports = router;
