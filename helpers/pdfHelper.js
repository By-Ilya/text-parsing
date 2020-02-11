const PARAGRAPH_FEATURES = ['.', '?', '!', '...', '..', '?!'];
const whitespaceSymbol = ' ';
const paragraphSymbol = '\n\n';

function processTextFromPdf({ text, lastToken, lastCursorPosition, textItem }) {
    let formattedText = text;

    if (lastCursorPosition !== textItem.transform[5] || !lastCursorPosition) {
        if (isIdentifiedNewParagraph(lastToken)) {
            formattedText += paragraphSymbol + textItem.str;
            return formattedText;
        }
        if (isIdentifiedWordHyphen(lastToken)) {
            formattedText = formattedText.slice(0, -1);
            formattedText += textItem.str;
            return formattedText;
        }
    }

    formattedText += whitespaceSymbol + textItem.str;
    return formattedText;
}

function isIdentifiedNewParagraph(token) {
    return PARAGRAPH_FEATURES.includes(token[token.length - 1]);
}

function isIdentifiedWordHyphen(token) {
    return token[token.length - 1] === '-';
}

module.exports = processTextFromPdf;