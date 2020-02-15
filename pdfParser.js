const path = require('path');
const pdfParser = require('pdf-parse');

const {
    TEMP_OUTPUT_DIR,
    TEMP_OUTPUT_FILE
} = require('./config');
const {
    readDataBufferFromFile,
    writeDataToFile
} = require('./helpers/filesHelper');
const processTextFromPdf = require('./helpers/pdfHelper');

const renderOptions = {
    normalizeWhitespace: false,
    disableCombineTextItems: false
};

renderPage = async (pageData) => {
    return pageData.getTextContent(renderOptions)
        .then(function(textContent) {
            let lastCursorPosition;
            let lastToken = '', text = '';
            textContent.items.forEach(item => {
                item.str = item.str.trim();
                if (!item.str) return;

                text = processTextFromPdf({
                    text,
                    lastToken,
                    lastCursorPosition,
                    textItem: item
                });

                lastToken = item.str;
                lastCursorPosition = item.transform[5];
            });
            return text;
        });
};

const parserOptions = {
    pagerender: renderPage
};

runPdfParser = async (filePath) => {
    try {
        let dataBuffer = await readDataBufferFromFile(filePath);
        await pdfParser(dataBuffer, parserOptions).then(async (data) => {
            await writeDataToFile(
                path.resolve(TEMP_OUTPUT_DIR, TEMP_OUTPUT_FILE),
                data.text
            );
        });
    } catch (err) {
        throw err;
    }
};


module.exports = runPdfParser;
