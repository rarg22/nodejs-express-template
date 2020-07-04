const CorrelationIdStore = require('../context/CorrelationId');

const X_CORRELATION_ID_HEADER_KEY = 'X-Correlation-ID';

const middleware = (req, res, next) => {
    CorrelationIdStore.bindEmitter(req);
    CorrelationIdStore.bindEmitter(res);

    CorrelationIdStore.withId(() => {
        const currentCorrelationId = CorrelationIdStore.getId();
        res.set(X_CORRELATION_ID_HEADER_KEY, currentCorrelationId);
        next();
    }, req.get(X_CORRELATION_ID_HEADER_KEY));
}

module.exports = {
    middleware
}