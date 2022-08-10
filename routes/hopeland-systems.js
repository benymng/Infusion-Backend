const { response } = require("express");
const express = require("express");
const article = require("../models/article");
const router = express.Router();
const Article = require("../models/article");
const hopelandArticle = require("../models/hopelandArticles");
const hopelandLogin = require("../models/hopelandLogin");

router.get("/articles", async (req, res) => {
  const articles = await hopelandArticle.find().sort({ createdAt: -1 });
  res.send(articles);
});

// get information for specific article
// router.get('/:id', async (req, res) => {
//   const article = await hopelandArticle.findById(req.params.id);
//   res.send(article);
// });

// router.get("/testimonials", async (req, res) => {
//   const testimonials = await testimonial.find();
//   res.send(testimonials);
// });

router.post("/", async (req, res, next) => {
  const article = new hopelandArticle(req.body);
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post("/testimonials", async (req, res, next) => {
//   const newTestimonal = new testimonial(req.body);
//   try {
//     await newTestimonal.save();
//     res.send(newTestimonal);
//   } catch (error) {
//     res.status(500).send(error);
//     console.log(error);
//   }
// });

// router.delete("/testimonial/delete/:name", async (req, res) => {
//   try {
//     const searchedTestimonial = await testimonial.findOneAndDelete({
//       name: req.params.name,
//     });
//     if (!searchedTestimonial) response.status(404).send("No testimonial found");
//     res.status(200).send();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.delete("/articles/:slug", async (req, res) => {
  try {
    const article = await hopelandArticle.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!article) response.status(404).send("No article found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:slug", async (req, res) => {
  const article = await hopelandArticle.findOne({ slug: req.params.slug });
  if (article == null) console.log("Could not find slug");
  res.send(article);
});

router.put("/edit/:slug", async (req, res) => {
  console.log(req.body);
  let article = await hopelandArticle.findOneAndUpdate(
    { slug: req.params.slug },
    {
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
      imageUrl: req.body.imageUrl,
    }
  );
  article = await hopelandArticle.findOne({ slug: req.params.slug });
  try {
    article.save();
  } catch (e) {
    console.log(e);
  }
  res.send(article);
  console.log("success");
});

// router.put("/testimonial/edit/:name", async (req, res) => {
//   console.log(req.body);
//   let updatedTestimonial = await testimonial.findOneAndUpdate(
//     { name: req.params.name },
//     {
//       name: req.body.name,
//       rating: req.body.rating,
//       description: req.body.description,
//       header: req.body.header,
//     }
//   );
//   updatedTestimonial = await testimonial.findOne({ slug: req.params.slug });
//   try {
//     updatedTestimonial.save();
//   } catch (e) {
//     console.log(e);
//   }
//   res.send(updatedTestimonial);
//   console.log("success");
// });

router.post("/login", async (req, res, next) => {
  const newUser = new hopelandLogin(req.body);
  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/admin/:name", async (req, res) => {
  const user = await hopelandLogin.findOne({ name: req.params.name });
  if (user == null) console.log("Could not find name");
  res.send(user);
});

module.exports = router;
