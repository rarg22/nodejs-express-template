
const { createLogger } = require('./winston');
const { getId } = require('../src/context/CorrelationId');

const logger = createLogger({
    correlation: true,
    getCorrelationId: getId,
    noCorrelationId: "nocorrelation"
});

module.exports = {
    logger
}