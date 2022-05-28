const express = require('express');
const SongController = require('../../controllers/SongController.js');
const router = express.Router();

const songController = new SongController;


//route GET    api/songs/
//description  Get the songs with a filtering
router.get('/', songController.getSongs);

//route POST    api/songs/
//description   Create a new song
router.post('/', songController.createSong);

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