const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const FilesUtil = require('../util/FileUtils');

const middleware = (options) => {
    const { outputDir = "./logs", format = "combined" } = options;
    FilesUtil.ensureDirectoryExists(outputDir);
    const accessLogStream = fs.createWriteStream(path.join(outputDir, 'access.log'), { flags: 'a' })
    return morgan(format, { stream: accessLogStream });
}

module.exports = {
    middleware
}