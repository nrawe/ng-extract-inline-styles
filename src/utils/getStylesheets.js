const fs = require("fs");
const { getFileNames } = require("./getFileNames");

/**
 * Finds stylesheets for Angular components for analysis.
 *
 * @param {string} angularInstance
 */
const getStylesheets = angularInstance =>
  getFileNames(`${angularInstance}/**/*.component.css`).map(file => ({
    name: file,
    contents: fs.readFileSync(file, "utf8")
  }));

exports.getStylesheets = getStylesheets;
