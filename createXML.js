const path = require('path');

const {
    TEMP_OUTPUT_DIR,
    TEMP_OUTPUT_FILE
} = require('./config');
const {
    readDataFromFile,
    writeDataToFile
} = require('./helpers/filesHelper');
const {
    getParagraphsFromText,
    getSentencesFromText
} = require('./helpers/nlpHelper');
const {
    createXmlHeader,
    createXmlParagraph,
    createXmlSentence
} = require('./helpers/xmlHelper');

runCreatingXmlFile = async (documentName, outputXmlPath) => {
    const inputFilePath = path.resolve(
        TEMP_OUTPUT_DIR,
        TEMP_OUTPUT_FILE
    );
    let data = await readDataFromFile(inputFilePath);

    let xmlRoot = createXmlHeader(documentName);

    const paragraphs = getParagraphsFromText(data, '\n\n');
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

    let xml = xmlRoot.end({pretty: true});
    await writeDataToFile(
        path.resolve(TEMP_OUTPUT_DIR, outputXmlPath),
        xml
    );
};


module.exports = runCreatingXmlFile;