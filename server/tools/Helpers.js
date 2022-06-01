const ErrorResponse = require("./ErrorResponse");

class Helpers {


    sanitize = async (value, pattern) => {

        if (!value) {

            throw new ErrorResponse('Your input is empty. Please enter the required value.', 422); 

        } else if (typeof value === 'number') {
            return { success: true }
            
        } if (typeof value !== 'string' || !value.match(pattern)) {
            throw new ErrorResponse('Your input does not match the requirements.', 422); 
        }
    
    }
}

module.exports = Helpers;