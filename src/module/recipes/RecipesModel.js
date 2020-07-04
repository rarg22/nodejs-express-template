const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let recipe = new Schema(
    {
        name: {
            type: String
        }
    }
);
module.exports = mongoose.model('recipe', recipe);