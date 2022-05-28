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

        const { phrase = null, startDate = null, endDate = null } = req.query;
        
        if (phrase && (typeof phrase !== 'string' || !phrase.match(this.titlePattern))) {
            return next(new ErrorResponse('Use letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).', 422)); 
        }

        const createdAtOptions = await startDate || endDate ? {
            createdAt: {
                [Op.between]: [ startDate ? moment(startDate).startOf('day') : 0, endDate ? moment(endDate).endOf('day') : moment().endOf('day')]
            }
        } : {}
        const phraseOptions = await phrase ? {
            title: {
                [Op.iLike]: `%${phrase}%`
            },
        } : {}
        
        const options = {
            where: {
                ...phraseOptions,
                ...createdAtOptions,
            },
            order: [
                ['title', 'ASC']
            ],
            include: [{ model: models.Author }, { model: models.Playlist, through: { model: models.SongPlaylist }}]
        }

        const songs = await models.Song.findAll(options)

        return res.json({
            success: true,
            songs,
        })
        
    })

    getSong = asyncHandler( async(req, res, next) => {

        const { id } = req.params;
        
        await this.helpers.sanitize(id, /\d+/)

        const song = await models.Song.findByPk(id, { include: [{ model: models.Author }, { model: models.Playlist, through: { model: models.SongPlaylist }}] })

        if (!song) return next(new ErrorResponse('Song does not exist.', 404));

        return res.json({
            success: true,
            song,
        })
        
    })
    
    updateSong = asyncHandler( async(req, res, next) => {

        const { title, author_id } = req.body;
        const { id } = req.params;
        const { action } = req.query;

        await this.helpers.sanitize(id, /\d+/)

        let song = await models.Song.findByPk(id, { include: { model: models.Author } })

        if (!song) return next(new ErrorResponse('Song does not exist.', 404));
        
        if (title) {

            await this.helpers.sanitize(title, this.titlePattern)

            song.title = title;

            await song.save();

        }
        if (typeof author_id === "number" && action === 'include') {
            
            song.author_id = author_id;

            await song.save();
            
        } else if (typeof author_id === "number" && action === 'delete') {

            song.author_id = null;
            song.Author = null;

            await song.save();
            
        }

        song = await models.Song.findByPk(id, { include: { model: models.Author } })

        return res.status(201).json({
            message: "Song updated",
            success: true,
            song,
        });

    })

    createSong = asyncHandler( async(req, res, next) => {

        const { title, author_id } = req.body;

        await this.helpers.sanitize(title, this.titlePattern)

        if (author_id) {

            const author = await models.Author.findByPk(author_id)

            if (!author) {
                return next(new ErrorResponse('Author does not exist.', 404)); 
            }

        }

        const song = await models.Song.create({ title, author_id }).then((element) => {
            return models.Song.findByPk(element.id, {include: { model: models.Author }})
        });
        

        return res.status(201).json({
            message: "Song Created",
            success: true,
            song,
        });

    })

    
    deleteSong = asyncHandler( async(req, res, next) => {

        const { id } = req.params;

        await this.helpers.sanitize(id, /\d+/)

        const playlist = await models.Song.findByPk(id);

        if (!playlist) return next(new ErrorResponse('Song does not exist.', 404));

        await models.Song.destroy({ where: { id } });
        
        await models.SongPlaylist.destroy({ 
            where: {
                PlaylistId: id,
            }
        })

        return res.status(200).json({
            message: "Playlist Deleted",
            success: true,
            playlist,
        });

    })

}

module.exports = SongController;