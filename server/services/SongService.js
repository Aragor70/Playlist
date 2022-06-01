const models = require("../models/");
const ErrorResponse = require("../tools/ErrorResponse");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const Helpers = require("../tools/Helpers");


class SongController {

    titlePattern = /^[0-9a-zA-Z \-_.,]+$/

    helpers = new Helpers

    getSongs = async(query) => {

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
            include: [{ model: models.Author }, { model: models.Playlist, through: { model: models.SongPlaylist }}]
        }
        
        const songs = await models.Song.findAll(options)

        return songs
        
    }

    getSong = async(id) => {
        
        await this.helpers.sanitize(id, /\d+/)

        const song = await models.Song.findByPk(id, { include: [{ model: models.Author }, { model: models.Playlist, through: { model: models.SongPlaylist }}] })

        if (!song) throw new ErrorResponse('Song does not exist.', 404);

        return song;
        
    }
    
    editSong = async(payload) => {

        const { title, author_id, song_id, action} = payload

        await this.helpers.sanitize(song_id, /\d+/)

        let song = await this.getSong(song_id)

        if (!song) throw new ErrorResponse('Song does not exist.', 404);
        
        if (title) {

            await this.helpers.sanitize(title, this.titlePattern)

            song.title = title;

            await song.save();

        }
        if (typeof author_id === "number" && action === 'include') {
            
            song.AuthorId = author_id;

            await song.save();
            
        } else if (typeof author_id === "number" && action === 'delete') {

            song.AuthorId = null;
            song.Author = null;

            await song.save();
            
        }

        song = await await this.getSong(song_id)

        return song

    }

    createSong = async(payload) => {

        const { title, author_id } = payload;

        await this.helpers.sanitize(title, this.titlePattern)

        if (author_id) {

            const author = await this.getSong(song_id)

            if (!author) {
                throw new ErrorResponse('Author does not exist.', 404); 
            }

        }

        const song = await models.Song.create({ title, AuthorId: author_id }).then((element) => {
            return this.getSong(element.id)
        });

        return song

    }

    
    deleteSong = async(song_id) => {

        await this.helpers.sanitize(song_id, /\d+/)

        const song = await this.getSong(song_id)

        if (!song) throw new ErrorResponse('Song does not exist.', 404);

        await models.Song.destroy({ where: { id: song.id } });
        
        await models.SongPlaylist.destroy({ 
            where: {
                SongId: song.id,
            }
        })

        return song

    }

}

module.exports = SongController;