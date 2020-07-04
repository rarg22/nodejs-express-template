
const RecipesService = require('./RecipesService');

const getAllRecipes = async (req, res) => {
    const recipes = await RecipesService.getAllRecipes();
    res.json({ data: recipes });
}

module.exports = {
    getAllRecipes 
}