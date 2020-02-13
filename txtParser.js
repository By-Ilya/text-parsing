const fs = require('fs');
const path = require('path');

const getFormattedTextFromData = require('./helpers/txtHelper');

const dataPath = path.resolve(__dirname, './article-examples/txt/');
const filePath = path.resolve(dataPath, './book2.txt');
const outputPath = path.resolve(__dirname, './output-data/');

fs.readFile(filePath, (err, dataBuffer) => {
    if (err) {
        console.log(err);
        return;
    }

    const data = dataBuffer.toString();
    const formattedText = getFormattedTextFromData(data);

    fs.writeFileSync(
        path.resolve(outputPath, './output.txt'),
        formattedText
    );
});