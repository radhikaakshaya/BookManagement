require("dotenv").config()
//framework
const express = require('express')
const mongoose = require('mongoose')
//importing json file for data
const db = require('./database/books')
// importing Api services
const Books = require('./APIServices/Book')
const Authors = require('./APIServices/Author')
const Publications = require('./APIServices/Publication')
//initialization
const server = express();
//configuration
server.use(express.json());

// establishing connection
mongoose.connect(process.env.MONGO_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => console.log('Connection Established'))
//Micro services
server.use("/book", Books)
server.use("/author", Authors)
server.use("/publication", Publications)

const PublicationModel = require('./database/publication')

/*
Routing  /a/authorbook/
description  getting author based on book
 access public
 parameters authorbook
 method get
*/
server.get("/a/:authorname", async (req, res) => {
 const specificbookonauthor = await db.Books.filter((book) => book.authors.includes(parseInt(req.params.authorname)))
 const authorid = db.Authors.filter((authorid) => authorid.id === specificbookonauthor)

 console.log(specificbookonauthor)
 if (specificbookonauthor.length === 0) {
  return res.json({ error: `No book is found on that specific ${req.params.authorname}` })
 }
 return res.json({ onauthor: specificbookonauthor })

})


// initializing the port to run the server
server.listen(3000, () => console.log(`server running on the port `));
