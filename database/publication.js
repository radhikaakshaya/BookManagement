const mongoose = require('mongoose')

const PublicationSchema = mongoose.Schema({
 pid: Number,
 name: String,
 Books: [Number]
})

const PublicationModel = mongoose.model("publications", PublicationSchema)

module.exports = PublicationModel