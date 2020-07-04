const mongoose = require('mongoose');
const RecipesModel = require('../recipes/RecipesModel');

const Schema = mongoose.Schema;

let cookbook = new Schema(
    {
        name: {
            type: String
        },
        recipes: [RecipesModel.schema]
    }
);
module.exports = mongoose.model('cookbook', cookbook);