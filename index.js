const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routeAPI = require('./routes/api');

let port = process.env.PORT || 5000;
const db = require("./config/keys").mongoURI;

mongoose
  .connect(
      process.env.MONGODB_URI || db
      {
          useNewUrlParser:true,
          useUnifiedTopology: true,
      },
  )
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', routeAPI);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
