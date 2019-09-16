const { isNull } = require("../../utils/isNull");
const { getValue } = require("../../utils/getValue");

const csv = componentScores => {
  console.log("Component Name,Score");

  Object.keys(componentScores).forEach(component => {
    const { template, stylesheet } = componentScores[component];

    const total =
      getValue(template, template) + getValue(stylesheet, stylesheet);

    const divider = (isNull(template) ? 0 : 1) + (isNull(stylesheet) ? 0 : 1);
    const score = total / divider;

    console.log(`${component},${score}`);
  });
};

exports.csv = csv;
