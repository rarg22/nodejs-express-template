const app = require('../../app');
const { logger } = require('../../loggers');
// const MongoDB = require('../../database/MongoDB');
const Mongoose = require('../../database/Mongoose');
const application = require('../../src/configuration/application');

const port = process.env.PORT || 3000;

const init = async () => {
    // await MongoDB.connect();
    try {
        await application.load();
        await Mongoose.connect();
        app.listen(port, () => {
            logger.info(`Express server is running on port ${port}`);
        })
    } catch (err) {
        logger.error(err);
    }   
}

init();
