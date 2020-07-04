
const CookbookController = require('./CookbooksController');
const express = require('express')
const router = express.Router()


router.get('/', CookbookController.findAllCookbooks);
router.get('/:id', CookbookController.findCookbookById);
router.post('/', CookbookController.createCookbook);


module.exports = {
    version: 1,
    basePath: "/cookbooks",
    name: 'CookbooksRouter',
    router
};