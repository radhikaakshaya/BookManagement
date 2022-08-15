const Router = require('express').Router();
const AuthorModel = require('../../database/author')
//Getting all Authors 
Router.get('/', async (req, res) => {
 const getAllAuthors = await AuthorModel.find()
 return res.json(getAllAuthors)
})


// getting specific author
Router.get('/:aid/', async (req, res) => {
 const specificAuthor = await AuthorModel.findOne({ id: req.params.aid })
 if (!specificAuthor) {
  return res.json({ error: `No book found as per your book ${req.params.aid}` })
 }
 return res.json({ onAuthorId: specificAuthor })
})


//posting new author
Router.post('/new', async (req, res) => {
 const { newauthor } = req.body;
 const newAuthor = await AuthorModel.create(newauthor);
 return res.json({ AddingNewAuthor: newAuthor, message: "Adding New Author" })
})

//-------DELETE----------//

// deleting author
Router.delete('/delete/:aid', async (req, res) => {
 const SearchAuthor = await AuthorModel.findOne({
  aid: req.params.aid
 })
 if (!SearchAuthor) {
  return res.json({ error: `The author Id ${req.params.aid} is not found` })
 } else {
  const deleteAuthor = await AuthorModel.findOneAndDelete({
   aid: req.params.aid
  })
  return res.json({ deletingAUTHOR: deleteAuthor, message: `deleting authorId ${req.params.aid}` })
 }

})

module.exports = Router;