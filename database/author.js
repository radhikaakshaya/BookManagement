const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
 aid: Number,
 name: String,
 Books: [Number]
})

const AuthorModel = mongoose.model("authors", AuthorSchema)

module.exports = AuthorModel