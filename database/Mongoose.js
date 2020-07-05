//Import the mongoose module
const mongoose = require('mongoose');
const yup = require('yup');
const logger = require('../loggers').createLogger(module);

//Set up default mongoose connection
const { MONGO_DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_DATABASE, MONGO_DB_USER } = process.env;
const connection = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}`;

let MongoDB;

const connect = () => {
    return new Promise((resolve, reject) => {
        const schema = yup.object().shape({
            username: yup.string().required(),
            password: yup.string().required(),
            host: yup.string().required(),
            database: yup.string().required()
        });
        const isValid = schema.isValidSync({
            username: MONGO_DB_USER,
            password: MONGO_DB_PASSWORD,
            host: MONGO_DB_HOST,
            database: MONGO_DB_DATABASE
        });
        if (!isValid) {
            reject(new Error('Missing connection details!'));
        } else {
            mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });
            MongoDB = mongoose.connection
            MongoDB.on('error', (err) => {
                reject(new Error);
            })
            MongoDB.once('open', () => {
                logger.info(`MongoDB connection [${MONGO_DB_HOST}/${MONGO_DB_DATABASE}] established!`);
                resolve();
            })
        }
    })
}

const get = () => {
    return MongoDB;
}

module.exports = {
    connect,
    MongoDB,
    get
}

