const whitespaceSymbol = ' ';
const paragraphSymbol = '\n\n';

const {
    getParagraphsFromText,
    getSentencesFromText
} = require('./nlpHelper');

getFormattedTextFromData = text => {
    const paragraphs = getParagraphsFromText(text, '\n');
    return paragraphs
        .map(paragraph => paragraph.trim())
        .filter(paragraph => (paragraph.toString() !== ''))
        .map(paragraph => {
            return getFormattedSentencesFromParagraph(paragraph);
        })
        .join(paragraphSymbol);
};

getFormattedSentencesFromParagraph = paragraph => {
    const sentences = getSentencesFromText(paragraph);
    return sentences
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.toString() !== '')
        .join(whitespaceSymbol);
};


module.exports = getFormattedTextFromData;