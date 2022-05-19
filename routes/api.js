const { response } = require('express');
const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const newArticle = require('../models/newArticle');

router.get('/articles', async (req, res) => {
  const articles = await newArticle.find();
  res.send(articles);
});

// get information for specific article
router.get('/:id', async (req, res) => {
  const article = await newArticle.findById(req.params.id);
  res.send(article);
});

router.post('/', async (req, res, next) => {
  const article = new newArticle(req.body);
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const article = await newArticle.findByIdAndDelete(req.params.id);

    if (!article) response.status(404).send('No article found');
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
