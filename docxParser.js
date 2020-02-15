const path = require('path');
const mammoth = require("mammoth");

const {
   TEMP_OUTPUT_DIR,
   TEMP_OUTPUT_FILE
} = require('./config');
const getFormattedTextFromData = require('./helpers/getFormattedData');
const { writeDataToFile } = require('./helpers/filesHelper');

runDocxParser = async (filePath) => {
   try {
      const text = (await mammoth.extractRawText({path: filePath})).value;
      await writeDataToFile(
          path.resolve(TEMP_OUTPUT_DIR, TEMP_OUTPUT_FILE),
          getFormattedTextFromData(text)
      );
   } catch (err) {
      throw err;
   }
};


module.exports = runDocxParser;