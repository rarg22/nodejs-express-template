const CookbooksModel = require('../cookbooks/CookbooksModel');
const { logger } = require('../../../loggers');

const getAllRecipes = async () => {
    try {
        const cookbooks = await CookbooksModel.find({});
        const recipes = [];
        cookbooks.forEach(cookbook => recipes.push(...cookbook.recipes));
        return recipes;
    } catch (err) {
        logger.error(err);
        return null
    }
}

module.exports = {
    getAllRecipes
}