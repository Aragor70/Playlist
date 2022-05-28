const express = require('express');
const AuthorController = require('../../controllers/AuthorController.js');
const router = express.Router();

const authorController = new AuthorController;


//route GET    api/authors/
//description  Get the authors with a filtering
router.get('/', authorController.getAuthors);

//route POST    api/authors/
//description   Create a new author
router.post('/', authorController.createAuthor);

//route GET    api/authors/:id
//description  Get author by id
router.get('/:id', authorController.getAuthor);

//route PUT    api/authors/:id
//description  Update author by id
router.put('/:id', authorController.updateAuthor);

//route DELETE   api/authors/:id
//description    Delete author by id
router.delete('/:id', authorController.deleteAuthor);


module.exports = router