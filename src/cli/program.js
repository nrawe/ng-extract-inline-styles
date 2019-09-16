const program = require("commander");
const { extractCommand: extract } = require("./extract/command");
const { scoreCommand: score } = require("./score/command");

program.version("1.0.0", "-v, --version", "Prints the version number");

program
  .command("extract")
  .description(
    "Extracts the custom styles from component templates for analysis"
  )
  .action(extract);

program
  .command("score")
  .description(
    "Performs analysis on all styles in the app to grade for responsive issues"
  )
  .action(score);

exports.program = program;
