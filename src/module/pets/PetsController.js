
const PetsService = require('./PetsService');

const findAll = (req, res, next) => {
    const data = PetsService.findAll();
    res.json({ data });
}

module.exports = {
    findAll
}