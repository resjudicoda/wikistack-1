const express = require('express');
const client = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('herei am');
});

module.exports = router;
