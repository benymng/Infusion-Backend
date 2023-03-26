const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routeAPI = require("./routes/api");
const routePortfolio = require("./routes/portfolio");
const bodyParser = require("body-parser");
const routeHopelandSystems = require("./routes/hopeland-systems");
const routeOpenAI = require("./routes/openai");
var cors = require("cors");

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 3003;
const db = require("./config/key").mongoURI;

mongoose
  .connect(process.env.MONGODB_URI || db)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", routeAPI);
app.use("/portfolio", routePortfolio);
app.use("/hopeland-systems", routeHopelandSystems);
app.use("/openai", routeOpenAI);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
