const asyncHandler = require("../middlewares/async");
const AuthorService = require('../services/AuthorService')


class AuthorController {

    
    constructor() {
        this.authorService = new AuthorService
    }
    

    getAuthors = asyncHandler( async(req, res, next) => {
        
        const authors = await this.authorService.getAuthors(req.query)

        return res.json({
            success: true,
            authors,
        })
        
    })

    getAuthor = asyncHandler( async(req, res, next) => {

        const { id } = req.params;
        
        const author = await this.authorService.getAuthor(id)

        return res.json({
            success: true,
            author,
        })
        
    })

    updateAuthor = asyncHandler( async(req, res, next) => {

        const { firstName, lastName, pseudo } = req.body;
        const { id } = req.params;

        const payload = { firstName, lastName, pseudo, author_id: id}

        const author = await this.authorService.updateAuthor(payload)

        return res.status(201).json({
            message: "Author updated",
            success: true,
            author,
        });

    })

    createAuthor = asyncHandler( async(req, res, next) => {

        const { firstName, lastName, pseudo } = req.body;

        const payload = { firstName, lastName, pseudo }

        const author = await this.authorService.createAuthor(payload)

        return res.status(201).json({
            message: "Author Created",
            success: true,
            author,
        });

    })

    
    deleteAuthor = asyncHandler( async(req, res, next) => {

        const { id } = req.params;

        const author = await this.authorService.deleteAuthor(id)

        return res.status(200).json({
            message: "Author Deleted",
            success: true,
            author,
        });

    })


}

module.exports = AuthorController;