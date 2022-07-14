const mongoose = require('mongoose')

// creating book schema
const BookSchema = mongoose.Schema({
 ISBN: String,
 title: String,
 authors: [Number],
 lang: String,
 publicationdate: String,
 numPages: Number,
 category: [String],
 publication: Number,
})

// creating book model
const BookModel = mongoose.model(BookSchema)

// exporting the bookmodel
module.exports = BookModel