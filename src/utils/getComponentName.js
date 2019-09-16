/**
 * Returns the name of the Angulat component.
 *
 * @param {string} file The name of the component file
 */
exports.getComponentName = file =>
  /\/([\w\-]+)\.component\.(css|html|ts)$/.exec(file)[1];
