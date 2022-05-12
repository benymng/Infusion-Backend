const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routeAPI = require('./routes/api');
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

let port = process.env.PORT || 5000;
const db = require('./config/key').mongoURI;

mongoose
  .connect(process.env.MONGODB_URI || db)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', routeAPI);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
