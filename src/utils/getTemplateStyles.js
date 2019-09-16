const fs = require("fs");
const { DocumentStylesParser } = require("./DocumentStylesParser");
const { getFileNames } = require("./getFileNames");
const { getParser } = require("./getParser");

/**
 * Extracts styles out of Angular templates for review.
 *
 * @param {string} angularInstance The angular app path to find components in
 */
const getTemplateStyles = angularInstance =>
  getFileNames(`${angularInstance}/**/*.component.html`).map(file => {
    const documentStyles = new DocumentStylesParser(file);

    getParser(documentStyles).write(fs.readFileSync(file));

    return documentStyles;
  });

exports.getTemplateStyles = getTemplateStyles;
