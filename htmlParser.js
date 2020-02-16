const request = require('request');
const cheerio = require('cheerio');
const path = require('path');

const {
    OUTPUT_DIR,
    OUTPUT_FILE
} = require('./config');
const getFormattedTextFromData = require('./helpers/getFormattedData');
const { writeDataToFile } = require('./helpers/filesHelper');

runHtmlParser = async (urlPath) => {
    try {
        const body = await promisifiedRequest(urlPath);

        const pageContent = cheerio.load(body);
        const text = pageContent('body').text();

        await writeDataToFile(
            path.resolve(OUTPUT_DIR, OUTPUT_FILE),
            getFormattedTextFromData(text)
        );
    } catch (err) {
        throw err;
    }
};

promisifiedRequest = async (url) => {
    return new Promise(((resolve, reject) => {
        request(url,  async (err, response, body) => {
            if (response) return resolve(body);
            if (err) return reject(err);
        });
    }));
};


module.exports = runHtmlParser;