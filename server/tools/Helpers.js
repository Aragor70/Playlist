const ErrorResponse = require("./ErrorResponse");

class Helpers {


    sanitize = async (value, pattern) => {

        if (!value || typeof value !== 'string' || !value.match(pattern)) {
            throw new ErrorResponse('Your input does not match the requirements.', 422); 
        }
    
    }
}

module.exports = Helpers;