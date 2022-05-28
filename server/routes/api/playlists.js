const express = require('express');
const PlaylistController = require('../../controllers/PlaylistController.js');
const router = express.Router();

const playlistController = new PlaylistController;


//route GET    api/songs/
//description  Get the songs with a filtering
router.get('/', playlistController.getPlaylists);

//route POST    api/songs/
//description   Create a new song
router.post('/', playlistController.createPlaylist);

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