const { isNull } = require("./isNull");

exports.getValue = (check, value) => (isNull(check) ? 0 : value);
