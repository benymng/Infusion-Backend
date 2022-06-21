const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    minimum: 0,
    maximum: 5,
  },
  description: {
    type: String,
  },
  header: {
    type: String,
  },
});

module.exports = mongoose.model("testimonial", testimonialSchema);
