const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../tools/ErrorResponse");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const Helpers = require("../tools/Helpers");
const models = require("../models");


class PlaylistController {

    titlePattern = /^[0-9a-zA-Z \-_.,]+$/

    helpers = new Helpers

    getPlaylists = asyncHandler( async(req, res, next) => {

        const playlists = await models.Playlist.findAll({ include: { model: models.Song, through: { model: models.SongPlaylist } } })

        return res.json({
            success: true,
            playlists,
        })
        
    })

    createPlaylist = asyncHandler( async(req, res, next) => {

        const { title } = req.body;

        await this.helpers.sanitize(title, this.titlePattern)

        const playlist = await models.Playlist.create({ title });

        return res.status(201).json({
            message: "Song Created",
            success: true,
            playlist,
        });

    })

}

module.exports = PlaylistController;