const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const UserExperience = require("../models/openai");
const latex = require("node-latex");
const fs = require("fs");
const pug = require("pug");
const path = require("path");
const { convertText } = require("html-to-latex");
const { spawn } = require("child_process");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

async function getAnswer(descriptionList, researchField) {
  const prompt = `which of the following experiences from this list of past work experiences are best for applying for ${researchField}: ${descriptionList} (return the entire body of the work experience that is best including all of the original fields only with no other generated text)`;
  console.log(prompt);
  try {
    if (prompt == null) {
      throw new Error("no prompt was provided");
    }
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
          // max_tokens: 500,
        },
      ],
    });
    const completion = response.data.choices[0].message.content;
    console.log(completion);
    return completion;
    // return res.status(200).json({
    //     success: true,
    //     message: completion,
    // })
  } catch (error) {
    console.log(error.message);
  }
}

router.get("/", async (req, res) => {
  const experiences = await UserExperience.find({ user: "00000" });
  const researchField = "data science";
  getAnswer(experiences, researchField).then((data) => res.json(data));
});

router.post("/test", async (req, res) => {
  const { researchField, userID } = req.body;
  const experiences = await UserExperience.find({ user: userID });
  getAnswer(experiences, researchField).then((data) => res.json(data));
});

router.get("/getUserExperiences", async (req, res) => {
  const allUserExperiences = await UserExperience.find().sort({
    createdAt: -1,
  });
  res.send(allUserExperiences);
});

router.get("/getUserExperiences/:user", async (req, res) => {
  const userExperiences = await UserExperience.find({ user: req.params.user });
  if (userExperiences == null) console.log("Could not find user");
  res.send(userExperiences.description);
});

router.post("/addUserExperience", async (req, res) => {
  const newExperience = new UserExperience(req.body);
  try {
    await newExperience.save();
    res.send(newExperience);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
