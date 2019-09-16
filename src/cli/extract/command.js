const { getTemplateStyles } = require("../../utils/getTemplateStyles");

exports.extractCommand = () =>
  getTemplateStyles(process.cwd()).forEach(style => console.log(`${style}`));
