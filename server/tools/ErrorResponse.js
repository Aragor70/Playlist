// Error template of constructor class
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode

    }
}
module.exports = ErrorResponse