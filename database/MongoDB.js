const MongoClient = require('mongodb').MongoClient;
const yup = require('yup');
const logger = require('../../loggers').createLogger(module);

const { MONGO_DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_DATABASE, MONGO_DB_USER } = process.env;

const connection = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}`;
const client = new MongoClient(connection, { useUnifiedTopology: true });

let database;

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
            client.connect((err) => {
                if (err) {
                    reject(new Error(err));
                }
                database = client.db(MONGO_DB_DATABASE)
                logger.info(`MongoDB connection [${MONGO_DB_HOST}/${MONGO_DB_DATABASE}] established!`);
                resolve();
            })
        }
    })
}

const get = () => {
    return database;
}

const close = () => {
    database.close();
}

module.exports = {
    connect,
    get,
    close
}
