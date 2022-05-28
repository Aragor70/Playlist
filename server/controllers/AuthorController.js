const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../tools/ErrorResponse");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const models = require("../models");
const Helpers = require("../tools/Helpers");


class AuthorController {

    titlePattern = /^[0-9a-zA-Z \-_.,]+$/

    helpers = new Helpers

    getAuthors = asyncHandler( async(req, res, next) => {

        const { phrase = null } = req.query;
        
        if (phrase && (typeof phrase !== 'string' || !phrase.match(this.titlePattern))) {
            return next(new ErrorResponse('Use letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).', 422)); 
        }

        const phraseOptions = await phrase ? {
            title: {
                [Op.iLike]: `%${phrase}%`
            },
        } : {}
        
        const options = {
            where: {
                ...phraseOptions,
            },
            order: [
                ['firstName', 'ASC']
            ]
        }

        const authors = await models.Author.findAll(options)


        return res.json({
            success: true,
            authors,
        })
        
    })

    getAuthor = asyncHandler( async(req, res, next) => {

        const { id } = req.params;
        
        await this.helpers.sanitize(id, /\d+/)

        const author = await models.Author.findByPk(id, { include: { model: models.Song } })

        if (!song) return next(new ErrorResponse('Author does not exist.', 404));

        return res.json({
            success: true,
            author,
        })
        
    })

    updateAuthor = asyncHandler( async(req, res, next) => {

        const { firstName, lastName, pseudo } = req.body;
        const { id } = req.params;

        await this.helpers.sanitize(firstName, this.titlePattern)

        const author = await models.Author.findByPk(id, { include: [{ model: models.Song }] })

        if (!author) return next(new ErrorResponse('Song does not exist.', 404));

        if (lastName) {
            await this.helpers.sanitize(lastName, this.titlePattern)

            author.lastName = lastName || author.lastName;

        }

        author.firstName = firstName || author.firstName;
        author.pseudo = pseudo || author.pseudo;

        await author.save();


        return res.status(201).json({
            message: "Author updated",
            success: true,
            author,
        });

    })

    createAuthor = asyncHandler( async(req, res, next) => {

        const { firstName, lastName, pseudo } = req.body;

        await this.helpers.sanitize(firstName, this.titlePattern)
        if (lastName) {
            await this.helpers.sanitize(lastName, this.titlePattern)
        }
        
        const author = await models.Author.create({ firstName, lastName, pseudo });

        return res.status(201).json({
            message: "Author Created",
            success: true,
            author,
        });

    })

    
    deleteAuthor = asyncHandler( async(req, res, next) => {

        const { id } = req.params;

        await this.helpers.sanitize(id, /\d+/)

        const author = await models.Song.findByPk(id);

        if (!author) return next(new ErrorResponse('Author does not exist.', 404));

        await models.Author.destroy({ where: { id } });
        

        return res.status(200).json({
            message: "Author Deleted",
            success: true,
            author,
        });

    })


}

module.exports = AuthorController;