import {
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
  configureStore,
} from "@reduxjs/toolkit";

import {
  artworkApi,
  reducer as artworkReducer,
} from "~/modules/artwork/artwork.js";

type ExtraArguments = {
  artworkApi: typeof artworkApi;
};

type RootReducer = {
  artwork: ReturnType<typeof artworkReducer>;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      UnknownAction,
      Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
    >
  >;

  public constructor() {
    this.instance = configureStore({
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
        });
      },
      reducer: {
        artwork: artworkReducer,
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      artworkApi,
    };
  }
}

const store = new Store();

type RootState = ReturnType<typeof store.instance.getState>;
type AppDispatch = typeof store.instance.dispatch;

export { type AppDispatch, type RootState, store };
