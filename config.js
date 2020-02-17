require('dotenv').config();

const OUTPUT_DIR = process.env.outputDirectory || './output-data';
const TEMP_OUTPUT_FILE = process.env.tempOutputFile || './output.txt';

module.exports = { OUTPUT_DIR, TEMP_OUTPUT_FILE };