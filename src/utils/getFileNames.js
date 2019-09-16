const glob = require("glob");

/**
 * Returns an array of files matching the path expression.
 *
 * @param {string} expr The path/glob to search for files
 */
exports.getFileNames = expr => glob.sync(expr);
