const hash = require("random-hash");
const os = require("os");

/**
 * Represents a set of CSS Rules embedded in an inline style.
 */
class CssDeclaration {
  /**
   * Creates a new instance of the CssDeclaration.
   *
   * @param {object} rules Key-value pairs representing the rules of the declaration
   */
  constructor(rules) {
    this.rules = rules;
  }

  /**
   * Returns an auto-generated class selector for the rule set.
   */
  get selector() {
    if (!this._selector) {
      this._selector = hash.generateHash({
        // CSS Selectors cannot begin with a number and there's no way to
        // control this. Also, this must be 2^n string (hence the otherwise)
        // arbitary length.
        charset: "abcdefghijklmnopqrstuvxyzABCDEFG".split("")
      });
    }

    return `.${this._selector}`;
  }

  /**
   * Returns the names of the rules contained in the set in alphabetical order.
   */
  get ruleNames() {
    return Object.keys(this.rules).sort();
  }

  /**
   * Returns a string representation of the declaration.
   */
  toString() {
    if (!this.ruleNames.length) {
      return "";
    }

    let rules = "";

    for (let rule of this.ruleNames) {
      rules += `  ${rule}: ${this.rules[rule]};` + os.EOL;
    }

    return `${this.selector} { ${os.EOL}${rules}} ${os.EOL}`;
  }

  /**
   * Factory which returns a CssDeclaration from an Angular style object.
   *
   * @param {string} value An Angular style object declaration
   */
  static fromSerializedObject(value) {
    // Properties can have single-quoted keys/values which are invalid in JSON
    const props = JSON.parse(value.replace(/'/g, `"`));

    return new this(props);
  }

  /**
   * Factory which returns a CssDeclaration from a CSS Rule.
   *
   * @param {string} value A CSS rule-set string
   */
  static fromCssString(value) {
    const rules = value
      .split(";")
      .map(line => line.replace(/(\r|\n)/g, "")) // Remove newlines
      .map(line => line.trim()) // Clean whitespace
      .filter(line => !!line) // Remove any empty values
      .map(line => line.split(":")) // Split this into key-value
      .reduce(
        (carry, [ruleName, ruleValue]) => ({
          ...carry,
          [ruleName]: ruleValue.trim()
        }),
        {}
      );

    return new this(rules);
  }
}

exports.default = CssDeclaration;
