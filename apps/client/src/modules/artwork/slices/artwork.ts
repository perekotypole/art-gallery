import { loadAll } from "./actions.js";
import { actions } from "./artwork.slice.js";

const allActions = {
  ...actions,
  loadAll,
};

export { allActions as actions };
export { reducer } from "./artwork.slice.js";
