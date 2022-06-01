const ErrorResponse = require("../tools/ErrorResponse");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const Helpers = require("../tools/Helpers");
const models = require("../models");


class PlaylistService {

    titlePattern = /^[0-9a-zA-Z \-_.,]+$/

    helpers = new Helpers


    getPlaylists = async (query) => {

        const { phrase = null, startDate = null, endDate = null } = query;
        
        if (phrase && (typeof phrase !== 'string' || !phrase.match(this.titlePattern))) {
            throw new ErrorResponse('Use letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).', 422); 
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

        return playlists
        
    }

    getPlaylist = async(id) => {
        
        await this.helpers.sanitize(id, /\d+/)

        const playlist = await models.Playlist.findByPk(id, { include: { model: models.Song, through: { model: models.SongPlaylist } } })

        if (!playlist) throw new ErrorResponse('Playlist does not exist.', 404);

        return playlist
        
        
    }

    createPlaylist = async(title) => {

        await this.helpers.sanitize(title, this.titlePattern)

        const playlist = await models.Playlist.create({ title });

        return playlist

    }

    editPlaylist = async(payload) => {

        const { title, song_id, playlist_id, action} = payload;

        await this.helpers.sanitize(playlist_id, /\d+/)

        let playlist = await this.getPlaylist(playlist_id)

        if (!playlist) throw new ErrorResponse('Playlist does not exist.', 404);
        
        if (title) {

            await this.helpers.sanitize(title, this.titlePattern)

            playlist.title = title;

            await playlist.save();

        }
        if (typeof song_id === "number" && action === 'include') {
            
            await models.SongPlaylist.create({
                SongId: song_id,
                PlaylistId: playlist_id,
            })
        } else if (typeof song_id === "number" && action === 'delete') {

            await models.SongPlaylist.destroy({ 
                where: {
                    SongId: song_id,
                    PlaylistId: playlist_id,
                }
            })
        }
        playlist = await this.getPlaylist(playlist_id)


        return playlist;

    }

    deletePlaylist = async(playlist_id) => {


        await this.helpers.sanitize(playlist_id, /\d+/)

        const playlist = await this.getPlaylist(playlist_id)

        if (!playlist) throw new ErrorResponse('Playlist does not exist.', 404);

        await models.Playlist.destroy({ where: { id: playlist.id } });
        
        await models.SongPlaylist.destroy({ 
            where: {
                PlaylistId: playlist.id,
            }
        })

        return playlist

    }

}

module.exports = PlaylistService;