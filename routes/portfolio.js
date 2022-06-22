const { response } = require("express");
const express = require("express");
const router = express.Router();
const Article = require("../models/portfolio-article");

router.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.send(articles);
});

router.post("/articles", async (req, res, next) => {
  const article = new Article(req.body);
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/articles/:slug", async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!article) response.status(404).send("No article found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/articles/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) console.log("Could not find slug");
  res.send(article);
});

router.put("/edit/:slug", async (req, res) => {
  console.log(req.body);
  let article = await Article.findOneAndUpdate(
    { slug: req.params.slug },
    {
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
      imageUrl: req.body.imageUrl,
    }
  );
  article = await Article.findOne({ slug: req.params.slug });
  try {
    article.save();
  } catch (e) {
    console.log(e);
  }
  res.send(article);
  console.log("success");
});

module.exports = router;
