const glob = require('glob')
const { logger } = require('../../loggers');
const application = require('../configuration/application');

const DEFAULT_MODULES_ROOT_DIRECTORY = './src';

const register = (app) => {
    if (app === null) {
        throw new Error('Express application is not initialized!');
    }
    const file = glob.sync("**/*Router.js", { cwd: DEFAULT_MODULES_ROOT_DIRECTORY });

    file.forEach(file => {
        const { version, basePath, name, router } = require(`../${file}`);

        logger.info(`Router found at [${file}]`);
        logger.info(`Registering [${name}]`);
        app.use(`/${application.path()}/v${version}${basePath}`, router);
    })
}

module.exports = {
    register
}


