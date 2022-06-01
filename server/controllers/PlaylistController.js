const asyncHandler = require("../middlewares/async");
const PlaylistService = require('../services/PlaylistService')


class PlaylistController {

    constructor() {
        this.playlistService = new PlaylistService
    }

    getPlaylists = asyncHandler( async(req, res, next) => {

        const playlists = await this.playlistService.getPlaylists(req.query)

        return res.json({
            success: true,
            playlists,
        })
        
    })

    getPlaylist = asyncHandler( async(req, res, next) => {
        
        const { id } = req.params;
        
        const playlist = await this.playlistService.getPlaylist(id)

        return res.json({
            success: true,
            playlist,
        })
        
    })

    createPlaylist = asyncHandler( async(req, res, next) => {

        const { title } = req.body;

        const playlist = await this.playlistService.createPlaylist(title)

        return res.status(201).json({
            message: "Playlist Created",
            success: true,
            playlist,
        });

    })

    editPlaylist = asyncHandler( async(req, res, next) => {

        const { title, song_id } = req.body;
        const { id } = req.params;
        const { action } = req.query;

        const payload = { title, song_id, playlist_id: id, action}

        const playlist = await this.playlistService.editPlaylist(payload)

        return res.status(201).json({
            message: "Playlist updated",
            success: true,
            playlist,
        });

    })

    deletePlaylist = asyncHandler( async(req, res, next) => {

        const { id } = req.params;
        
        const playlist = await this.playlistService.deletePlaylist(id)

        return res.status(200).json({
            message: "Playlist Deleted",
            success: true,
            playlist,
        });

    })

}

module.exports = PlaylistController;