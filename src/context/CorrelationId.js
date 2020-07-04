const { createNamespace } = require('cls-hooked');
const store = createNamespace('ns-correlation-id');
const cuid = require('cuid');

const CORRELATION_ID_KEY = 'correlation-id';

const withId = (fn, id) => {
    store.run(() => {
        store.set(CORRELATION_ID_KEY, id || cuid());
        fn();
    });
};

const getId = () => {
    return store.get(CORRELATION_ID_KEY);
}

module.exports = {
    getId,
    withId,
    bindEmitter: store.bindEmitter.bind(store),
    bind: store.bind.bind()
}