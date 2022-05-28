const express = require('express');
const SongController = require('../../controllers/SongController.js');
const router = express.Router();

const songController = new SongController;


//route GET    api/songs/
//description  Get the songs with a filtering
router.get('/', songController.getSongs);

//route GET    api/songs/:id
//description  Get the song by id
router.get('/:id', songController.getSong);

//route POST    api/songs/
//description   Create a new song
router.post('/', songController.createSong);

//route PUT    api/songs/:id
//description  Include an author into song or update song title
router.put('/:id', songController.updateSong);

//route DELETE  api/songs/:id
//description   Delete song by id
router.delete('/:id', songController.deleteSong);


module.exports = router