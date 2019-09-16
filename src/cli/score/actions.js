/**
 * Registers a component.
 *
 * @param {string} name The name of the component
 */
const addComponent = name => ({ type: "ADD_COMPONENT", name });

/**
 * Registers a score for a component stylesheet.
 *
 * @param {string} name The name of the component
 * @param {integer} score The score for the component stylesheet
 */
const scoreStylesheet = (name, score) => ({
  type: "SCORE_STYLESHEET",
  name,
  score
});

/**
 * Registers a score for a component template file.
 *
 * @param {string} name The name of the component
 * @param {integer} score The score for the component template
 */
const scoreTemplate = (name, score) => ({
  type: "SCORE_TEMPLATE",
  name,
  score
});

exports.addComponent = addComponent;
exports.scoreStylesheet = scoreStylesheet;
exports.scoreTemplate = scoreTemplate;
