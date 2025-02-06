import { createSlice } from "@reduxjs/toolkit";

import { loadAll } from "./actions.js";
import type { ArtworkFindAllResponse } from "../types/types.js";

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
  },
  initialState,
  name: "artworks",
  reducers: {},
});

export { actions, name, reducer };
