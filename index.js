const path = require('path');
const { spawn } = require('child_process');

const { isFileExists } = require('./helpers/filesHelper');
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

                switch (fileExt) {
                    case '.pdf':
                        await runPdfParser(pathToFile);
                        break;
                    case '.docx':
                        await runDocxParser(pathToFile);
                        break;
                    case '.txt':
                        await runTxtParser(pathToFile);
                        break;
                    case '.html':
                        console.log('Coming soon...');
                        break;
                    default:
                        console.log(`Error: ${pathToFile}: file format doesn't identified`);
                        process.exit(0);
                }

                await runCreatingXmlFile(fileName, xmlFile);
                console.log(`File ${fileName}${fileExt} parsed successfully!`);
            }
        } catch (err) {
            console.log(err);
            process.exit(0);
        }
    } else {
        console.log('Error: specify command argument with file path. Exiting...');
        process.exit(0);
    }
};

spawnDocxParser = async filePath => {
    const resolvedFilePath = path.resolve(filePath);
    const docxParserExec = spawn('node', [
        'docxParser', `${resolvedFilePath}`
    ]);

    docxParserExec.stdout.pipe(process.stdout);
    docxParserExec.stderr.pipe(process.stderr);

    return new Promise((res, rej) => {
        docxParserExec.on('close', code => {
            if (code !== 0) {
                console.log(`docxParser process exited with code ${code}`);
                rej();
            }
            res();
        });
    });
};

runParsing();