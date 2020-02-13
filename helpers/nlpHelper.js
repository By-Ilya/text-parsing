const SentenceTokenizer = require('sentence-tokenizer');

let sentenceTokenizer = new SentenceTokenizer('Chuck');

function getParagraphsFromText(text, paragraphSymbol = '\n') {
    return text.split(paragraphSymbol);
}

function getSentencesFromText(text) {
    sentenceTokenizer.setEntry(text);
    return sentenceTokenizer.getSentences();
}

module.exports = { getParagraphsFromText, getSentencesFromText };