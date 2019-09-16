const { addComponent, scoreStylesheet, scoreTemplate } = require("./actions");
const { csv } = require("./csv");
const { configureStore } = require("./store");
const { score, Options } = require("../../utils/score");
const { getComponentName } = require("../../utils/getComponentName");
const { getComponents } = require("../../utils/getComponents");
const { getStylesheets } = require("../../utils/getStylesheets");
const { getTemplateStyles } = require("../../utils/getTemplateStyles");

exports.scoreCommand = () => {
  const store = configureStore();
  const angular = process.cwd();

  // First, load all components into memory
  getComponents(angular).map(name => store.dispatch(addComponent(name)));

  // Now, parse and score the stylesheets
  getStylesheets(angular).forEach(({ name, contents }) => {
    store.dispatch(
      scoreStylesheet(getComponentName(name), score(contents, new Options()))
    );
  });

  // Then, parse and score the styles embedded into the templates
  getTemplateStyles(angular).forEach(style => {
    store.dispatch(
      scoreTemplate(
        getComponentName(style.fileName),
        score(`${style}`, new Options({ isInline: true }))
      )
    );
  });

  // Lastly, write the result to the screen
  csv(store.getState());
};
