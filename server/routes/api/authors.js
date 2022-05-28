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

/* //route GET    api/songs/:id
//description  Get the song by id
router.get('/:id', songController.getTask);



//route PUT    api/songs/:id
//description  Update song by id
router.put('/:id', songController.updateTask);

//route DELETE  api/songs/:id
//description   Delete song by id
router.delete('/:id', songController.deleteTask); */

module.exports = router