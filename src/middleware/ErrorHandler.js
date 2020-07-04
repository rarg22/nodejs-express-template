
const HttpStatus = require('http-status-codes');

const NOT_FOUND = (req, res, next) => {
    try {
        if (!req.route) {
            throw new Error();
        }
    } catch (error) {
        error.statusCode = HttpStatus.NOT_FOUND;
        error.message = "Route not found!";
        next(error);
    }
}
const UNEXPECTED_ERROR = (error, req, res, next) => {
    const status = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message;
    const data = error.data;

    res.status(status)
        .json({
            message,
            data,
            details: error.errorDetails
        });
}

module.exports = {
    NOT_FOUND,
    UNEXPECTED_ERROR
}