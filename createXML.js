const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, './output-data/output.txt');

let dataBuffer = fs.readFileSync(inputPath);