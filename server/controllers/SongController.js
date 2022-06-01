const asyncHandler = require("../middlewares/async");
const SongService = require('../services/SongService')


class SongController {

    constructor() {
        this.songService = new SongService
    }

    getSongs = asyncHandler( async(req, res, next) => {

        const songs = await this.songService.getSongs(req.query)

        return res.json({
            success: true,
            songs,
        })
        
    })

    getSong = asyncHandler( async(req, res, next) => {

        const { id } = req.params;
        
        const song = await this.songService.getSong(id)

        return res.json({
            success: true,
            song,
        })
        
    })
    
    updateSong = asyncHandler( async(req, res, next) => {

        const { title, author_id } = req.body;
        const { id } = req.params;
        const { action } = req.query;

        const payload = { title, author_id, song_id: id, action}

        const song = await this.songService.editSong(payload)

        return res.status(201).json({
            message: "Song updated",
            success: true,
            song,
        });

    })

    createSong = asyncHandler( async(req, res, next) => {

        const { title, author_id } = req.body;

        const payload = { title, author_id }

        const song = await this.songService.createSong(payload)
        
        return res.status(201).json({
            message: "Song Created",
            success: true,
            song,
        });

    })

    
    deleteSong = asyncHandler( async(req, res, next) => {

        const { id } = req.params;

        const song = await this.songService.deleteSong(id)
        
        return res.status(200).json({
            message: "Song Deleted",
            success: true,
            song,
        });

    })

}

module.exports = SongController;