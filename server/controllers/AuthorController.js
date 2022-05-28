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

        const authors = await models.Author.findAll()


        return res.json({
            success: true,
            authors,
        })
        
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

}

module.exports = AuthorController;