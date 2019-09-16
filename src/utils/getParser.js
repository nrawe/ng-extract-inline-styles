const { Parser } = require("htmlparser2");

/**
 * Returns an HTML Parser which can be used to interpret the template.
 *
 * @param {object} customParser
 */
const getParser = customParser =>
  new Parser(customParser, { decodeEntities: true });

exports.getParser = getParser;
