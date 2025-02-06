import { createSlice } from "@reduxjs/toolkit";

import type {
  ArtworkFindAllResponse,
  ArtworkFindResponse,
} from "~/modules/artwork/artwork.js";

import { loadAll, create, getById, deleteById } from "./actions.js";

type State = {
  artworks: ArtworkFindAllResponse;
  artwork: ArtworkFindResponse | null;
};

const initialState: State = {
  artworks: [],
  artwork: null,
};

const { actions, name, reducer } = createSlice({
  extraReducers(builder) {
    builder.addCase(loadAll.fulfilled, (state, action) => {
      state.artworks = action.payload;
    });
    builder.addCase(loadAll.rejected, (state) => {
      state.artworks = [];
    });

    builder.addCase(create.fulfilled, (state, action) => {
      state.artworks = [action.payload, ...state.artworks];
    });

    builder.addCase(getById.fulfilled, (state, action) => {
      state.artwork = action.payload;
    });
    builder.addCase(getById.pending, (state) => {
      state.artwork = null;
    });

    builder.addCase(deleteById.fulfilled, (state) => {
      const artworkId = state.artwork?.id;
      state.artworks = state.artworks.filter(
        (artwork) => artwork.id !== artworkId,
      );
      state.artwork = null;
    });
  },
  initialState,
  name: "artworks",
  reducers: {},
});

export { actions, name, reducer };
