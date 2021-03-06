const fs = require('fs');
const xmlBuilder = require('xmlbuilder');

const XML_PROPS = {
    documentTag: 'document',
    blockTag: 'block',

    documentProps: {
        attribute: 'name',
        defaultValue: 'documentName'
    },

    paragraphProps: { 'type': 'paragraph' },
    sentenceProps: { 'type': 'sentence' }
};

createXmlHeader = (documentName) => {
    let xmlHeader = xmlBuilder.create(XML_PROPS.documentTag);
    xmlHeader.att(
        XML_PROPS.documentProps.attribute,
        documentName
            ? documentName
            : XML_PROPS.documentProps.defaultValue
    );

    return xmlHeader;
};

createXmlParagraph = (xmlHeader) => {
    return xmlHeader.ele(
        XML_PROPS.blockTag,
        XML_PROPS.paragraphProps
    );
};

createXmlSentence = (xmlParagraph, data) => {
    return xmlParagraph.ele(
        XML_PROPS.blockTag,
        XML_PROPS.sentenceProps,
        data
    );
};


module.exports = {
    createXmlHeader,
    createXmlParagraph,
    createXmlSentence
};