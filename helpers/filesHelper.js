const fs = require('fs').promises;
const path = require('path');

isFileExists = async path => {
    try {
        await fs.access(path, fs.F_OK);
        return true;
    } catch (err) {
        throw err;
    }
};

readDataBufferFromFile = async (filePath) => {
    const resolvedFilePath = path.resolve(filePath);
    return (async() =>  {
        try {
            return await fs.readFile(resolvedFilePath);
        } catch (err) {
            throw err;
        }
    })();
};

readDataFromFile = async (filePath) => {
    const resolvedFilePath = path.resolve(filePath);
    return (async() =>  {
        try {
            const dataBuffer = await fs.readFile(resolvedFilePath);
            return dataBuffer.toString();
        } catch (err) {
            throw err;
        }
    })();
};

writeDataToFile = async (filePath, data) => {
    const resolvedFilePath = path.resolve(filePath);
    await fs.writeFile(resolvedFilePath, data, (err => {
        if (err) { throw err; }
    }));
};

module.exports = { isFileExists, readDataBufferFromFile, readDataFromFile, writeDataToFile };