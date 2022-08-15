// importing router 
const Router = require('express').Router();
// const Router = express.Router

// importing/initializing Book-model
const BookModel = require('../../database/book')

/*
Routing  /
description  getting all books from books
 access public
 parameters 
 method get
*/
Router.get('/', async (req, res) => {
 const getAllBooks = await BookModel.find()
 return res.json(getAllBooks)
})

/*
Routing  /:isbn
description  getting specific book from books
 access public
 parameters /:isbn
 method get
*/
Router.get('/:isbn', async (req, res) => {
 const specificBook = await BookModel.findOne({ ISBN: req.params.isbn });
 if (!specificBook) {
  return res.json({ error: `No book found as per your book ${req.params.isbn}` })
 }
 return res.json({ Book: specificBook })
})

// posting new book
Router.post('/new', async (req, res) => {
 const { newbook } = req.body;
 const newBook = await BookModel.create(newbook);
 return res.json({ AddingNewBook: newBook, message: "adding new book" })
})

//getting book based on category
Router.get("/c/:cname", async (req, res) => {
 const basedOnCategory = await BookModel.findOne({
  category: req.params.cname
 })
 if (!basedOnCategory) {
  return res.json({ error: `No book is found on that specific ${req.params.cname}` })
 }
 return res.json({ onCategory: basedOnCategory })
})




//---------UPDATE-----------//

// updating title in book model
Router.put("/update/:isbn", async (req, res) => {
 const updateBook = await BookModel.findOneAndUpdate(
  {
   ISBN: req.params.isbn
  },
  {
   title: req.body.BookTitle
  },
  {
   new: true
  })
 return res.json({ updatingBook: updateBook })
})

// update new author in bookmodel and book isbn in author model
Router.put("/author/book/update/:isbn", async (req, res) => {
 //updating newauthors in book table
 const updateBookAuthor = await BookModel.findOneAndUpdate(
  {
   ISBN: req.params.isbn
  },
  {
   $addToSet: {
    authors: req.body.newAuthor,
   },
  },
  {
   new: true
  },

 );
 //updating books in author table
 const updateAuthorBook = await AuthorModel.findOneAndUpdate(
  {
   aid: req.body.newAuthor
  },
  {
   $addToSet: {
    Books: req.params.isbn
   }
  },
  {
   new: true
  }
 );
 return res.json({
  updatingBook: updateBookAuthor, updatingAuthor: updateAuthorBook, message: 'updating book in authors table and updating authors in book table'
 })

})

//-----------DELETE------------//
// deleting author in book table and deleting book in author table
Router.delete('/delete/author/book/:isbn/:aid/', async (req, res) => {
 // const SearchBook = await BookModel.findOne({
 //  ISBN: req.params.isbn
 // },
 //  {
 //   authors: parseInt(req.params.aid)
 //  }
 // )
 // const SearchAuthor = await AuthorModel.findOne({
 //  aid: parseInt(req.params.aid)
 // },
 //  {
 //   Books: req.params.isbn
 //  })
 // if (!SearchAuthor) {
 //  return res.json({ error: `Searching for Author Id  and Book Id ${req.params.aid} --  ${req.params.isbn}  is not found` })
 // }
 // else {
 const deleteAuthor = await BookModel.findOneAndUpdate({
  ISBN: req.params.isbn
 },
  {
   // to delete only author id from the book
   $pull: {
    authors: parseInt(req.params.aid)
   }
  }, {
  new: true
 }
 )
 const deleteBook = await AuthorModel.findOneAndUpdate({
  aid: parseInt(req.params.aid)
 },
  {
   // to delete only author id from the book
   $pull: {
    Books: req.params.isbn
   }
  },
  {
   new: true
  }

 )
 return res.json({ deletingAuthor: deleteAuthor, deletingBook: deleteBook, message: "deleting book from author  and deleting author from book" })
 //}
})

module.exports = Router;