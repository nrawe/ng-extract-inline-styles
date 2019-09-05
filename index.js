const fs = require("fs");
const glob = require("glob");
const htmlparser2 = require("htmlparser2");
const process = require("process");
const DocumentStylesParser = require("./src/DocumentStylesParser").default;

/**
 * Returns an array of files matching the path expression.
 *
 * @param {string} expr The path/glob to search for files
 */
const getFiles = expr => glob.sync(expr);

/**
 * Returns an HTML Parser which can be used to interpret the template.
 *
 * @param {string} customParser
 */
const getParser = customParser =>
  new htmlparser2.Parser(customParser, { decodeEntities: true });

/**
 * Finds the files and outputs the result to the console.
 *
 * @param {object} options
 */
const getDocumentStyles = ({ angularInstance }) =>
  getFiles(`${angularInstance}/**/*.html`).map(file => {
    const documentStyles = new DocumentStylesParser(file);

    getParser(documentStyles).write(fs.readFileSync(file));

    return documentStyles;
  });

const main = () => {
  const options = {
    angularInstance: process.cwd()
  };

  // Output to the console for now, this could be redirected in the future
  getDocumentStyles(options).forEach(style => console.log(`${style}`));
};

main();
