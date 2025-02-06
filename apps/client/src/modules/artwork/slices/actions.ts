import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/modules/store/store.js";
import {
  artworkApi,
  type ArtworkFindAllRequest,
  type ArtworkFindAllResponse,
  type ArtworkCreateRequest,
  type ArtworkCreateResponse,
} from "~/modules/artwork/artwork.js";

import { name as sliceName } from "./artwork.slice.js";

const loadAll = createAsyncThunk<
  ArtworkFindAllResponse,
  ArtworkFindAllRequest,
  AsyncThunkConfig
>(`${sliceName}/load-all`, async (query) => {
  return await artworkApi.getAll(query);
});

const create = createAsyncThunk<
  ArtworkCreateResponse,
  ArtworkCreateRequest,
  AsyncThunkConfig
>(`${sliceName}/create`, async (payload) => {
  return await artworkApi.create(payload);
});

export { loadAll, create };
