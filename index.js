require("dotenv").config()
//framework
const express = require('express')
const mongoose = require('mongoose')
//importing json file for data
const db = require('./database/books')
//initialization
const server = express();
//configuration
server.use(express.json());

// establishing connection
mongoose.connect(process.env.MONGO_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => console.log('Connection Established'))

//Getting all books 
server.get('/', (req, res) => {
 return res.json({ "gettingBooks": db.Books })
})
//getting specific book
server.get('/:id', (req, res) => {
 const specificBook = db.Books.filter((dd) => dd.ISBN === parseInt(req.params.id));
 if (specificBook.length === 0) {
  return res.json({ error: `No book found as per your book ${req.params.id}` })
 }
 return res.json({ Book: specificBook })
})

//getting book based on category

server.get("/c/:cname", (req, res) => {
 const basedOnCategory = db.Books.filter((cbook) => cbook.category.includes(req.params.cname))
 if (basedOnCategory.length === 0) {
  return res.json({ error: `No book is found on that specific ${req.params.cname}` })
 }
 return res.json({ onCategory: basedOnCategory })
})

//Getting all Authors 
server.get('/author', (req, res) => {
 return res.json({ "gettingAuthors": db.Authors })
})

/*
Routing  /a/authorbook/
description  getting author based on book
 access public
 parameters authorbook
 method get
*/
server.get("/a/:authorname", (req, res) => {
 const specificbookonauthor = db.Books.filter((book) => book.authors.includes(parseInt(req.params.authorname)))
 const authorid = db.Authors.filter((authorid) => authorid.id === specificbookonauthor)

 console.log(specificbookonauthor)
 if (specificbookonauthor.length === 0) {
  return res.json({ error: `No book is found on that specific ${req.params.authorname}` })
 }
 return res.json({ onauthor: specificbookonauthor })

})

//Getting all Publications 
server.get('/publication', (req, res) => {
 return res.json({ "gettingPublications": db.Publications })
})

// initializing the port to run the server
server.listen(3000, () => console.log(`server running on the port `));
