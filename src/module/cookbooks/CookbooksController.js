
const CookbookService = require('./CookbooksService');
const { logger } = require('../../../loggers');
const HttpStatus = require('http-status-codes');
const _ = require('underscore');

const findAllCookbooks = async (req, res, next) => {
    try {
        const cookbooks = await CookbookService.findAllCookbooks();
        if (!_.isEmpty(cookbooks)) {
            res.status(HttpStatus.OK);
            res.json({ data: cookbooks });
        } else {
            res.status(HttpStatus.NOT_FOUND);
            res.send();
        }
    } catch (err) {
        logger.error(err);
        err.statusCode = 500;
        next(err);
    }
}

const findCookbookById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cookbooks = await CookbookService.findCookbookById(id);
        if (!_.isEmpty(cookbooks)) {
            res.status(HttpStatus.OK);
            res.json({ data: cookbooks });
        } else {
            res.status(HttpStatus.NOT_FOUND);
            res.send();
        }
    } catch (err) {
        logger.error(err);
        err.statusCode = 500;
        next(err);
    }
}

const createCookbook = async (req, res, next) => {
    try {
        const { name, recipes } = req.body;
        const cookbook = await CookbookService.createCookbook({ name, recipes });
        if (cookbook) {
            res.setHeader('Location', `${req.baseUrl}/${cookbook._id}`)
            res.status(HttpStatus.CREATED);
            res.send();
        } else {
            res.status(HttpStatus.CONFLICT);
            res.send();
        }
    } catch (err) {
        logger.error(err);
        err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        next(err);
    }
}
module.exports = {
    findAllCookbooks,
    createCookbook,
    findCookbookById
}