import { loadAll, create, getById } from "./actions.js";
import { actions } from "./artwork.slice.js";

const allActions = {
  ...actions,
  loadAll,
  create,
  getById,
};

export { allActions as actions };
export { reducer } from "./artwork.slice.js";
