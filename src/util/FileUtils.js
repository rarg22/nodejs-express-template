const fs = require('fs');

const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}

module.exports = {
    ensureDirectoryExists
}