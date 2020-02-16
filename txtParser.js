const path = require('path');

const {
    OUTPUT_DIR,
    OUTPUT_FILE
} = require('./config');
const {
    readDataFromFile,
    writeDataToFile
} = require('./helpers/filesHelper');
const getFormattedTextFromData = require('./helpers/getFormattedData');

runTxtParser = async (filePath) => {
    try {
        let data = await readDataFromFile(filePath);
        await writeDataToFile(
            path.resolve(OUTPUT_DIR, OUTPUT_FILE),
            getFormattedTextFromData(data)
        );
    } catch (err) {
        throw err;
    }
};


module.exports = runTxtParser;