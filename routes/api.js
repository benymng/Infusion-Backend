const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/test', async (req, res) => {
  const articles = await Article.find();
  res.send(articles);
});

module.exports = router;
