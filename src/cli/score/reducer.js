/**
 * The reducer for tracking changes to component score state.
 */
exports.reducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COMPONENT":
      return {
        ...state,
        [action.name]: { template: null, stylesheet: null }
      };

    case "SCORE_TEMPLATE":
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          template: action.score
        }
      };

    case "SCORE_STYLESHEET":
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          stylesheet: action.score
        }
      };

    default:
      return state;
  }
};
