const { getComponentName } = require("./getComponentName");
const { getFileNames } = require("./getFileNames");

/**
 * Returns the names of components which make up the angular app.
 *
 * @param {string} angularInstance The angular app path to find components in
 */
const getComponents = angularInstance =>
  getFileNames(`${angularInstance}/**/*.component.html`).map(getComponentName);

exports.getComponents = getComponents;
