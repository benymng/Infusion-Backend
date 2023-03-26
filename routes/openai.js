const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const UserExperience = require("../models/openai");

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

getAnswer = (descriptionList, researchField) => {
    return new Promise(async(resolve, reject) => {
        try {
            openai.createCompletion({
                model: "text-davinci-001",
                prompt: `which of the following experiences from this list of past work experiences are best for applying for a research opportunity for ${researchField}: ${descriptionList} (return the entire body of the work experience that is best)`,
                max_tokens: 100,

            }).then((data) =>{
                resolve({status:200, message:data.data.choices[0].text});
            });
        } catch(e) {
            reject(e);
        }
    })
}

router.get("/", async(req, res) => {
    // res.send("hello world");
    const experiences = await UserExperience.find({user: "00000"});
    // const descriptions = experiences.map(experiences => experiences.description);
    const researchField = "website development";
    getAnswer(experiences, researchField).then(data => res.json(data));
})

router.get("/getUserExperiences", async (req, res) => {
    const allUserExperiences = await UserExperience.find().sort({ createdAt: -1 });
    res.send(allUserExperiences);
})

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
})

router.post("/getAnswer", (req, res) => {
    console.log("req.body", req.body);
    getAnswer(req).then(data => res.json(data));
})

module.exports = router;
