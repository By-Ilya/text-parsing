const fs = require('fs');
const path = require('path');

const runPdfParser = require('./pdfParser');
const runDocxParser = require('./docxParser');
const runTxtParser = require('./txtParser');
const runCreatingXmlFile = require('./createXML');

const args = process.argv.slice(2);

runParsing = async () => {
    if (args.length > 0) {
        try {
            const pathToFile = args[0];
            if (isFileExists(pathToFile)) {
                const fileExt = path.extname(pathToFile);
                const fileName = path.basename(pathToFile, fileExt);
                const xmlFile = `${fileName}.xml`;
                switch (fileExt) {
                    case '.pdf':
                        await runPdfParser(pathToFile);
                        await runCreatingXmlFile(fileName, xmlFile);
                        break;
                    case '.docx':
                        await runDocxParser(pathToFile);
                        await runCreatingXmlFile(fileName, xmlFile);
                        break;
                    case '.txt':
                        await runTxtParser(pathToFile);
                        await runCreatingXmlFile(fileName, xmlFile);
                        break;
                    case '.html':
                        console.log('Coming soon...');
                        break;
                    default:
                        console.log(`Error: ${pathToFile}: file format doesn't identified`);
                        process.exit(0);
                }
            }
        } catch (err) {
            console.log(err);
            process.exit(0);
        }
    } else {
        console.log('Error: please, specify path to file!');
        console.log(`Run again with command: npm start 'pathToFile'`);
        console.log('Exiting...');
        process.exit(0);
    };
};

isFileExists = path => {
    fs.access(path, fs.F_OK, (err) => {
        if (err) throw err;
    });
    return true;
};


runParsing();