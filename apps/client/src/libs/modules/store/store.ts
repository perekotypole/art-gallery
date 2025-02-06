import {
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
  configureStore,
} from "@reduxjs/toolkit";

import { reducer as artworkReducer } from "~/modules/artwork/artwork.js";

type RootReducer = {
  artwork: ReturnType<typeof artworkReducer>;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      UnknownAction,
      Tuple<[ThunkMiddleware<RootReducer, UnknownAction>]>
    >
  >;

  public constructor() {
    this.instance = configureStore({
      reducer: {
        artwork: artworkReducer,
      },
    });
  }
}

const store = new Store();

type RootState = ReturnType<typeof store.instance.getState>;
type AppDispatch = typeof store.instance.dispatch;

type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: RootState;
};

export { type AsyncThunkConfig, type AppDispatch, type RootState, store };
