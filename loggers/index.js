
const winston = require('./Winston');
const { getId } = require('../src/context/CorrelationId');

const createLogger = (callingModule) => {
    if (!callingModule) {
        throw new Error('Missing Module argument!');
    }
    const moduleName = getModuleName(callingModule);
    return winston.createLogger({
        moduleName,
        correlation: true,
        getCorrelationId: getId,
        noCorrelationId: "nocorrelation"
    });
};

const getModuleName = (callingModule) => {
    const [moduleName] = callingModule.filename.split('/').slice(-1);
    return moduleName.replace(/.js/g, '');
}

module.exports = {
    createLogger
}