const mongoose = require('mongoose');
// const { marked } = require('marked');
const slugify = require('slugify');
// const createDomPurify = require('dompurify');
// const { JSDOM } = require('jsdom');

//allows dompurifier to create html and purify it
// const dompurify = createDomPurify(new JSDOM().window);

const userExperience = new mongoose.Schema({
    researchExperience: {
        type: String,
        required: true,
    },
    // for example who the professor you worked for was
    collaborator: {
        type: String,
    },
    institution: {
        type: String,
    },
    description: {
        type: [String],
        requred: true,
    },
    keyWords: {
        type: [String],
    },
    position: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    currentlyWorking: {
        type: Boolean,
        default: false,
    },
    location: {
        type: String,
    },
    userID: {
        type: String,
        required: true,
        // unique: true,
    },
});

//before the schema is created, create the slug
// userExperience.pre('validate', function (next) {
//   if (this.title) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   next();
// });
module.exports = mongoose.model('UserExperience', userExperience);
