require("dotenv").config();

password = process.env.DB_URI_PASSWORD;

module.exports = {
  mongoURI: `mongodb+srv://Ben:${password}@cluster0.qtjn2.mongodb.net/blog?retryWrites=true&w=majority`,
};
