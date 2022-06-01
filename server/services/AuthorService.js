const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../tools/ErrorResponse");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require("../models");
const Helpers = require("../tools/Helpers");


class AuthorService {

    titlePattern = /^[0-9a-zA-Z \-_.,]+$/

    helpers = new Helpers

    getAuthors = async(query) => {

        const { phrase = null } = query;
        
        if (phrase && (typeof phrase !== 'string' || !phrase.match(this.titlePattern))) {
            throw new ErrorResponse('Use letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).', 422); 
        }

        const phraseOptions = await phrase ? {
            firstName: {
                [Op.iLike]: `%${phrase}%`
            },
        } : {}
        
        const options = {
            where: {
                ...phraseOptions,
            },
            order: [
                ['firstName', 'ASC']
            ],
            include: { model: models.Song }
        }

        const authors = await models.Author.findAll(options)

        return authors
        
    }

    getAuthor = async(author_id) => {

        await this.helpers.sanitize(author_id, /\d+/)

        const author = await models.Author.findByPk(author_id, { include: { model: models.Song } })

        if (!author) throw new ErrorResponse('Author does not exist.', 404);

        return author
        
    }

    updateAuthor = async(payload) => {

        const { firstName, lastName, pseudo, author_id} = payload

        await this.helpers.sanitize(firstName, this.titlePattern)

        const author = await this.getAuthor(author_id)

        if (!author) throw new ErrorResponse('Song does not exist.', 404);

        if (lastName) {
            await this.helpers.sanitize(lastName, this.titlePattern)

            author.lastName = lastName || author.lastName;

        }

        author.firstName = firstName || author.firstName;
        author.pseudo = pseudo || author.pseudo;

        await author.save();

        return author

    }

    createAuthor = async(payload) => {

        const { firstName, lastName, pseudo } = payload;

        await this.helpers.sanitize(firstName, this.titlePattern)
        if (lastName) {
            await this.helpers.sanitize(lastName, this.titlePattern)
        }
        
        const author = await models.Author.create({ firstName, lastName, pseudo });

        return author

    }

    
    deleteAuthor = async(author_id) => {


        await this.helpers.sanitize(author_id, /\d+/)

        const author = await this.getAuthor(author_id);

        if (!author) throw new ErrorResponse('Author does not exist.', 404);

        await models.Author.destroy({ where: { id: author.id } });

        return author

    }


}

module.exports = AuthorService;