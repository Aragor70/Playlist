const asyncHandler = require("../middlewares/async");
const models = require("../models/");
const ErrorResponse = require("../tools/ErrorResponse");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const Helpers = require("../tools/Helpers");


class SongController {

    titlePattern = /^[0-9a-zA-Z \-_.,]+$/

    helpers = new Helpers

    getSongs = asyncHandler( async(req, res, next) => {

        const songs = await models.Song.findAll({ include: [{ model: models.Author }, { model: models.Playlist, through: { model: models.SongPlaylist }}] })

        return res.json({
            success: true,
            songs,
        })
        
    })

    createSong = asyncHandler( async(req, res, next) => {

        const { title, author_id } = req.body;

        await this.helpers.sanitize(title, this.titlePattern)

        const author = await models.Author.findByPk(author_id)

        if (!author) {
            return next(new ErrorResponse('Author does not exist.', 404)); 
        }
        
        const song = await models.Song.create({ title, author_id });

        return res.status(201).json({
            message: "Song Created",
            success: true,
            song,
        });

    })

}

module.exports = SongController;