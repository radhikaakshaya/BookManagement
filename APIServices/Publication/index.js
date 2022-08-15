const Router = require('express').Router();

// initializing Publication model
const PublicationModel = require('../../database/publication')


//Getting all Publications 
Router.get('/', async (req, res) => {
 const gettingAllPublications = await PublicationModel.find()
 return res.json(gettingAllPublications)
})

//getting specific publication
Router.get('/:id', async (req, res) => {
 const getSpecificPublication = await PublicationModel.findOne({ id: req.params.id })
 if (!getSpecificPublication) {
  return res.json({ error: `No book found as per your book ${req.params.id}` })
 }
 return res.json({ onPublicationId: getSpecificPublication })
})


// posting new publication
Router.post('/new', async (req, res) => {
 const { newpublication } = req.body;
 const newPublication = await PublicationModel.create(newpublication)
 return res.json({ AddingNewPublication: newPublication, message: "Adding new Publication" })
})
module.exports = Router;