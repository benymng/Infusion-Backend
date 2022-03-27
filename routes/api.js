const { response } = require('express');
const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/articles', async (req, res) => {
  const articles = await Article.find();
  res.send(articles);
});

// get information for specific article
router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.send(article);
});

router.post('/', async (req, res, next) => {
  const article = new Article(req.body);
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) response.status(404).send('No article found');
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
