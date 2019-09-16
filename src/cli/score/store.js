const { createStore } = require("redux");
const { reducer } = require("./reducer");

exports.configureStore = () => createStore(reducer);
