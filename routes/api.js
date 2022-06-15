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
// router.get('/:id', async (req, res) => {
//   const article = await newArticle.findById(req.params.id);
//   res.send(article);
// });

router.post('/', async (req, res, next) => {
  const article = new newArticle(req.body);
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:slug', async (req, res) => {
  try {
    const article = await newArticle.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!article) response.status(404).send('No article found');
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:slug', async (req, res) => {
  const article = await newArticle.findOne({ slug: req.params.slug });
  if (article == null) console.log('Could not find slug');
  res.send(article);
});

router.put("/edit/:slug", async(req, res) => {
  console.log(req.body)
  let article = await newArticle.findOneAndUpdate({ slug: req.params.slug }, {title: req.body.title, description: req.body.description, markdown: req.body.markdown, imageUrl: req.body.imageUrl});
  article = await newArticle.findOne({slug: req.params.slug });
  res.send(article);
  console.log("success")
})

module.exports = router;
