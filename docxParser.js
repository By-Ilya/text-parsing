const path = require('path');
const docxParser = require('docx-parser');

const {
   TEMP_OUTPUT_DIR,
   TEMP_OUTPUT_FILE
} = require('./config');
const {
   isFileExists,
   writeDataToFile
} = require('./helpers/filesHelper');

const args = process.argv.slice(2);

runDocxParser = async () => {
   try {
      if (args.length > 0) {
         const filePath = args[0];
         if (await isFileExists(filePath)) {
            docxParser.parseDocx(filePath,  async (data) => {
               await writeDataToFile(
                   path.resolve(TEMP_OUTPUT_DIR, TEMP_OUTPUT_FILE),
                   data
               );
            });
            process.exit(0);
         }
      } else {
         console.log('Error: specify command argument with file path.');
         process.exit(0);
      }
   } catch (err) {
      throw err;
   }
};

runDocxParser();