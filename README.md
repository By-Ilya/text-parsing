# text-parsing
Parse different documents, extract and format text, and create unified `.xml` file with parsed data.

## Document formats
- PDF documents (`.pdf`);
- MS Office documents (`.docx`);
- text documents (`.txt`);
- HTML sites (`.html` pages).

## Parsed XML file structure
    <?xml version="1.0"?>
    <document name="documentNameOrLink">
        <block type="paragraph">
            <block type="sentence">...</block>
            ...
        </block>
        ...
    </document>

## Requirements
1. `NodeJS` library and `NPM` package manager.
2. Libraries installed from `package.json` file.

## Install and run
1. Go to the project root directory.
2. Run `npm i` or `npm install` command. This command installs necessary libraries.
3. Open `config.js` file and configure `OUTPUT_DIR` and `OUTPUT_FILE` variables with directory to output data and temporary
output file name. `./output-data/` and `output.txt` is configured as a default values.
4. Run `npm start <pathToFile>` or `npm start <urlPath>` command, where `<pathTofile>` is path to parsing file
(absolute or relative path) and `<urlPath>` is HTTP(s) url to HTML-site.
5. See the result `.xml` file in the `OUTPUT_DIR` directory.

#### Examples of running commands
- parsing file: `npm start ./article-examples/pdf/da-tagging.pdf`
- parsing site: `npm start https://habr.com/ru/post/488540/`

## Used `NodeJS` libraries
- `request` (version `2.88.2`) is used for making HTTP(s)-queries;
- `cheerio` (version `1.0.0-rc.3`) is used for parsing HTML data;
- `pdf-parse` (version `1.1.1`) is used for extracting text from PDF documents;
- `mammoth` (version `1.4.9`) is used for extracting text from MS Office documents;
- `sentence-tokenizer` (version `1.0.1`) is used for splitting text to sentences;
- `xmlbuilder` (version `13.0.2`) is used for building output XML file.

 
