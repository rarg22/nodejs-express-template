
const PetsController = require('./PetsController');
const express = require('express')
const router = express.Router()

router.get('/', PetsController.findAll);

module.exports = {
    version: 1,
    basePath: "/pets",
    name: 'PetsRouter',
    router
};