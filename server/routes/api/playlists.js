const express = require('express');
const PlaylistController = require('../../controllers/PlaylistController.js');
const router = express.Router();

const playlistController = new PlaylistController;


//route GET    api/playlists/
//description  Get the playlists with a filtering
router.get('/', playlistController.getPlaylists);

//route GET    api/playlists/:id
//description  Get the playlist by id
router.get('/:id', playlistController.getPlaylist);

//route POST    api/playlists/
//description   Create a new playlist
router.post('/', playlistController.createPlaylist);

//route DELETE  api/playlists/:id
//description   Delete playlist by id
router.delete('/:id', playlistController.deletePlaylist);

//route PUT     api/playlists/
//description   Include a song into playlist or update playlist title
router.put('/:id', playlistController.editPlaylist);


module.exports = router