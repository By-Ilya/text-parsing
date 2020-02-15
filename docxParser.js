const path = require('path');
const docxParser = require('docx-parser');

const {
   TEMP_OUTPUT_DIR,
   TEMP_OUTPUT_FILE
} = require('./config');
const { writeDataToFile } = require('./helpers/filesHelper');

runDocxParser = async (filePath) => {
   try {
      let docxData = '';
      docxParser.parseDocx(filePath, async (data) => {
         docxData = data;
      });

      await writeDataToFile(
          path.resolve(TEMP_OUTPUT_DIR, TEMP_OUTPUT_FILE),
          docxData
      );
   } catch (err) {
      throw err;
   }
};

module.exports = runDocxParser;