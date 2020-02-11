const fs = require('fs');
const path = require('path');
const docxParser = require('docx-parser');

const dataPath = path.resolve(__dirname, './article-examples/docx/');
const fileName = path.resolve(dataPath, './report.docx');
const outputPath = path.resolve(__dirname, './output-data/');

docxParser.parseDocx(fileName, (data) => {
   fs.writeFileSync(
       path.resolve(outputPath, './output.txt'),
       data
   );
});