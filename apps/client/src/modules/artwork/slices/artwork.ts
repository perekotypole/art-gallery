import { loadAll, create, getById, deleteById } from "./actions.js";
import { actions } from "./artwork.slice.js";

const allActions = {
  ...actions,
  loadAll,
  create,
  getById,
  deleteById,
};

export { allActions as actions };
export { reducer } from "./artwork.slice.js";
