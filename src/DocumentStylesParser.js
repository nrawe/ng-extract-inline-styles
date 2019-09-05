const os = require("os");
const CssDeclaration = require("./CssDeclaration").default;

/**
 * Designed for usage with htmlparser2.
 */
class DocumentStylesParser {
  constructor(fileName) {
    this.fileName = fileName;
    this.rules = [];
  }

  onattribute(name, value) {
    if (name === "style") {
      this.rules.push(CssDeclaration.fromCssString(value));
    }

    if (name === "[style]") {
      this.rules.push(CssDeclaration.fromSerializedObject(value));
    }
  }

  toString() {
    if (!this.rules.length) {
      return "";
    }

    let rules = "";

    for (let rule of this.rules) {
      rules += `${rule}${os.EOL}`;
    }

    return `/**${os.EOL} * ${this.fileName}${os.EOL} */${os.EOL}${os.EOL}${rules}`;
  }
}

exports.default = DocumentStylesParser;
