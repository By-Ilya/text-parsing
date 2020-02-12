const fs = require('fs');
const path = require('path');

const {
    getParagraphsFromText,
    getSentencesFromText
} = require('./helpers/nlpHelper');

const {
    createXmlHeader,
    createXmlParagraph,
    createXmlSentence,
    createXmlFile
} = require('./helpers/xmlHelper');

const inputFilePath = path.resolve(__dirname, './output-data/output.txt');
const outputXmlPath = path.resolve(__dirname, './output-data/document.xml');

fs.readFile(inputFilePath, (err, dataBuffer) => {
    if (err) {
        console.log(err);
        return;
    }

    const data = dataBuffer.toString();

    let xmlRoot = createXmlHeader();

    const paragraphs = getParagraphsFromText(data);
    paragraphs.forEach(paragraph => {
        if (paragraph) {
            let paragraphBlock = createXmlParagraph(xmlRoot);

            const sentences = getSentencesFromText(paragraph);
            sentences.forEach(sentence => {
                if (sentence)
                    createXmlSentence(paragraphBlock, sentence);
            });
        }
    });

    let xml = xmlRoot.end({ pretty: true });
    createXmlFile(outputXmlPath, xml);
});