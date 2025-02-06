import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
  type ArtworkFindAllRequest,
  type ArtworkFindAllResponse,
} from "~/modules/artwork/artwork.js";

import { name as sliceName } from "./artwork.slice.js";

const loadAll = createAsyncThunk<
  ArtworkFindAllResponse,
  ArtworkFindAllRequest,
  AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
  const { artworkApi } = extra;

  return await artworkApi.getAll(query);
});

export { loadAll };
