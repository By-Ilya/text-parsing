const path = require('path');

const {
    OUTPUT_DIR,
    TEMP_OUTPUT_FILE
} = require('./config');
const {
    isFileExists,
    deleteFile
} = require('./helpers/filesHelper');
const runPdfParser = require('./pdfParser');
const runDocxParser = require('./docxParser');
const runTxtParser = require('./txtParser');
const runHtmlParser = require('./htmlParser');
const runCreatingXmlFile = require('./createXML');

const args = process.argv.slice(2);

runParsing = async () => {
    if (args.length > 0) {
        try {
            const pathToFile = args[0];

            if (isFilePathURL(pathToFile)) {
                await runHtmlParser(pathToFile);
                await runCreatingXmlFile(
                    `${pathToFile}`,
                    'htmlParsedData.xml'
                );
                await deleteFile(
                    path.resolve(OUTPUT_DIR, TEMP_OUTPUT_FILE)
                );
                console.log(`Site ${pathToFile} parsed successfully!`);
                process.exit(0);
            }

            if (await isFileExists(pathToFile)) {
                const fileExt = path.extname(pathToFile);
                const fileName = path.basename(pathToFile, fileExt);
                const xmlFile = `${fileName}.xml`;

                await chooseAndRunParser(fileExt, pathToFile);

                await runCreatingXmlFile(fileName, xmlFile);
                await deleteFile(
                    path.resolve(OUTPUT_DIR, TEMP_OUTPUT_FILE)
                );
                console.log(`File ${fileName}${fileExt} parsed successfully!`);
                process.exit(0);
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

isFilePathURL = (filePath) => {
    const urlPattern = new RegExp(
        /((http|https):\/\/(www\.)?[a-zа-я0-9-]+\.[a-zа-я0-9-]{2,6})/i
    );

    return urlPattern.test(filePath);
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
        default:
            console.log(`Error: ${filePath}: file format doesn't identified.`);
            process.exit(0);
    }
};


runParsing();