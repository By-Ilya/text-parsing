const path = require('path');
const fs = require('fs');
const pdfParser = require('pdf-parse');

const processTextFromPdf = require('./helpers/pdfHelper');

const renderOptions = {
    normalizeWhitespace: false,
    disableCombineTextItems: false
};

renderPage = (pageData) => {
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

const dataPath = path.resolve(__dirname, './article-examples/pdf/');
const filePath = path.resolve(dataPath, './hierarchial-crf-for-da-tagging.pdf');
const outputPath = path.resolve(__dirname, './output-data/');

const parserOptions = {
    pagerender: renderPage
};

let dataBuffer = fs.readFileSync(filePath);
pdfParser(dataBuffer, parserOptions).then((data) => {
    fs.writeFileSync(
        path.resolve(outputPath, './output.txt'),
        data.text
    );
});
