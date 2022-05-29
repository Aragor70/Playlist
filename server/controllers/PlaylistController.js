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
            include: { model: models.Song, through: { model: models.SongPlaylist } }
        }

        const playlists = await models.Playlist.findAll(options)

        return res.json({
            success: true,
            playlists,
        })
        
    })

    getPlaylist = asyncHandler( async(req, res, next) => {
        
        const { id } = req.params;
        
        await this.helpers.sanitize(id, /\d+/)

        const playlist = await models.Playlist.findByPk(id, { include: { model: models.Song, through: { model: models.SongPlaylist } } })

        if (!playlist) return next(new ErrorResponse('Playlist does not exist.', 404));

        return res.json({
            success: true,
            playlist,
        })
        
    })

    createPlaylist = asyncHandler( async(req, res, next) => {

        const { title } = req.body;

        await this.helpers.sanitize(title, this.titlePattern)

        const playlist = await models.Playlist.create({ title });

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

        await this.helpers.sanitize(id, /\d+/)

        let playlist = await models.Playlist.findByPk(id, { include: { model: models.Song, through: { model: models.SongPlaylist } } })

        if (!playlist) return next(new ErrorResponse('Playlist does not exist.', 404));
        
        if (title) {

            await this.helpers.sanitize(title, this.titlePattern)

            playlist.title = title;

            playlist.save();

        }
        if (typeof song_id === "number" && action === 'include') {
            
            await models.SongPlaylist.create({
                SongId: song_id,
                PlaylistId: id,
            })
        } else if (typeof song_id === "number" && action === 'delete') {

            await models.SongPlaylist.destroy({ 
                where: {
                    SongId: song_id,
                    PlaylistId: id,
                }
            })
        }
        playlist = await models.Playlist.findByPk(id, { include: { model: models.Song, through: { model: models.SongPlaylist } } })


        return res.status(201).json({
            message: "Playlist updated",
            success: true,
            playlist,
        });

    })

    deletePlaylist = asyncHandler( async(req, res, next) => {

        const { id } = req.params;

        await this.helpers.sanitize(id, /\d+/)

        const playlist = await models.Playlist.findByPk(id);

        if (!playlist) return next(new ErrorResponse('Playlist does not exist.', 404));

        await models.Playlist.destroy({ where: { id } });
        
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

module.exports = PlaylistController;