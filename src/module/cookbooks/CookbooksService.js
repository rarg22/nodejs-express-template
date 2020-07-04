const { logger } = require('../../../loggers');
// const MongoDB = require('../../../database/MongoDB');
const CookbooksModel = require('./CookbooksModel');

const findAllCookbooks = async () => {
    try {
        const cookbooks = await CookbooksModel.find({});
        return cookbooks;
    } catch (err) {
        logger.error(err);
        return null
    }
}

const findCookbookById = async (id) => {
    try {
        const cookbook = await CookbooksModel.find({ _id: id });
        return cookbook;
    } catch (err) {
        logger.error(err);
        return null
    }
}


const createCookbook = async ({ name, recipes }) => {
    try {
        let newCookbook = new CookbooksModel({ name, recipes });
        newCookbook = await newCookbook.save();
        if (newCookbook) {
            logger.info('Cookbook Created!', newCookbook._doc);
            return newCookbook._doc;
        } else {
            return null;
        }
    } catch (err) {
        logger.error(err);
        return null;
    }

}

module.exports = {
    findAllCookbooks,
    findCookbookById,
    createCookbook
}