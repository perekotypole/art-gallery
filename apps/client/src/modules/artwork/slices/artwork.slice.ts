import { createSlice } from "@reduxjs/toolkit";

import type { ArtworkFindAllResponse } from "~/modules/artwork/artwork.js";

import { loadAll, create } from "./actions.js";

type State = {
  artworks: ArtworkFindAllResponse;
};

const initialState: State = {
  artworks: [],
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
  },
  initialState,
  name: "artworks",
  reducers: {},
});

export { actions, name, reducer };
