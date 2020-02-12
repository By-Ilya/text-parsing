const SentenceTokenizer = require('sentence-tokenizer');

const paragraphSymbol = '\n\n';
let sentenceTokenizer = new SentenceTokenizer('Chuck');

function getParagraphsFromText(text) {
    return text.split(paragraphSymbol);
}

function getSentencesFromText(text) {
    sentenceTokenizer.setEntry(text);
    return sentenceTokenizer.getSentences();
}

module.exports = { getParagraphsFromText, getSentencesFromText };