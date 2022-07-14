const mongoose = require('mongoose')

const PublicationSchema = mongoose.Schema({
 id: Number,
 name: String,
 Books: [Number]
})

const PublicationModel = mongoose.model(PublicationSchema)

module.exports = PublicationModel