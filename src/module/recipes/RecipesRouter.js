
const RecipesController = require('./RecipesController');
const express = require('express')
const router = express.Router()

router.get('/', RecipesController.getAllRecipes);

module.exports = {
    version: 1,
    basePath: "/recipes",
    name: 'RecipesRouter',
    router
};