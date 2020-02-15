const path = require('path');

const {
    TEMP_OUTPUT_DIR,
    TEMP_OUTPUT_FILE
} = require('./config');
const {
    isFileExists,
    deleteFile
} = require('./helpers/filesHelper');
const runPdfParser = require('./pdfParser');
const runDocxParser = require('./docxParser');
const runTxtParser = require('./txtParser');
const runCreatingXmlFile = require('./createXML');

const args = process.argv.slice(2);

runParsing = async () => {
    if (args.length > 0) {
        try {
            const pathToFile = args[0];
            if (await isFileExists(pathToFile)) {
                const fileExt = path.extname(pathToFile);
                const fileName = path.basename(pathToFile, fileExt);
                const xmlFile = `${fileName}.xml`;

                await chooseAndRunParser(fileExt, pathToFile);

                await runCreatingXmlFile(fileName, xmlFile);
                await deleteFile(
                    path.resolve(TEMP_OUTPUT_DIR, TEMP_OUTPUT_FILE)
                );
                console.log(`File ${fileName}${fileExt} parsed successfully!`);
            }
        } catch (err) {
            console.log(err);
            process.exit(0);
        }
    } else {
        console.log('Error: specify command argument with file path.');
        process.exit(0);
    }
};

chooseAndRunParser = async (fileExtName, filePath) => {
    switch (fileExtName) {
        case '.pdf':
            await runPdfParser(filePath);
            break;
        case '.docx':
            await runDocxParser(filePath);
            break;
        case '.txt':
            await runTxtParser(filePath);
            break;
        case '.html':
            console.log('Coming soon...');
            break;
        default:
            console.log(`Error: ${filePath}: file format doesn't identified.`);
            process.exit(0);
    }
};


runParsing();