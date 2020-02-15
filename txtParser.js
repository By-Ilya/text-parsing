const path = require('path');

const {
    TEMP_OUTPUT_DIR,
    TEMP_OUTPUT_FILE
} = require('./config');
const {
    readDataFromFile,
    writeDataToFile
} = require('./helpers/filesHelper');
const getFormattedTextFromData = require('./helpers/txtHelper');

runTxtParser = async (filePath) => {
    try {
        let data = await readDataFromFile(filePath);
        const formattedText = await getFormattedTextFromData(data);
        await writeDataToFile(
            path.resolve(TEMP_OUTPUT_DIR, TEMP_OUTPUT_FILE),
            formattedText
        );
    } catch (err) {
        throw err;
    }
};


module.exports = runTxtParser;