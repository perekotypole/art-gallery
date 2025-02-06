import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/modules/store/store.js";
import {
  artworkApi,
  type ArtworkFindAllRequest,
  type ArtworkFindAllResponse,
} from "~/modules/artwork/artwork.js";

import { name as sliceName } from "./artwork.slice.js";

const loadAll = createAsyncThunk<
  ArtworkFindAllResponse,
  ArtworkFindAllRequest,
  AsyncThunkConfig
>(`${sliceName}/load-all`, async (query) => {
  return await artworkApi.getAll(query);
});

export { loadAll };
