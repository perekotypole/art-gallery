import { loadAll, create } from "./actions.js";
import { actions } from "./artwork.slice.js";

const allActions = {
  ...actions,
  loadAll,
  create,
};

export { allActions as actions };
export { reducer } from "./artwork.slice.js";
