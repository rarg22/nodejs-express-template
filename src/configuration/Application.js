
const yup = require('yup');
const { APPLICATION_PATH } = process.env

const load = () => {
    return new Promise((resolve, reject) => {
        const schema = yup.object().shape({
            application_path: yup.string().required()
        });
        const isValid = schema.isValidSync({
            application_path: APPLICATION_PATH
        });
        if (!isValid) {
            reject(new Error('Missing application environment properties!'));
        } else {
            resolve();
        }
    })
}

const path = () => {
    return APPLICATION_PATH;
}

module.exports = {
    load,
    path
}