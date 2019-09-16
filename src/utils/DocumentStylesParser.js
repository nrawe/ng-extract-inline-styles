const os = require("os");
const CssDeclaration = require("./CssDeclaration").default;
const { dd } = require("./dd");

/**
 * Designed for usage with htmlparser2.
 */
class DocumentStylesParser {
  /**
   * Creates a new instance of the DocumentStylesParser.
   *
   * @param {string} fileName The name of the file being parsed
   */
  constructor(fileName) {
    this.fileName = String(fileName);
    this.rules = [];
  }

  /**
   * Parses styles out of the template.
   *
   * @param {string} name The name of the attribute
   * @param {string} value The value of the attribute
   */
  onattribute(name, value) {
    try {
      if (name === "style") {
        this.rules.push(CssDeclaration.fromCssString(value));
      }

      if (name === "[style]") {
        this.rules.push(CssDeclaration.fromSerializedObject(value));
      }
    } catch (ex) {
      dd(`Error when processing file ${this.fileName}:${os.EOL}${os.EOL}${ex}`);
    }
  }

  /**
   * Returns a representation of the inline styles as a standalone CSS document.
   */
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

exports.DocumentStylesParser = DocumentStylesParser;
