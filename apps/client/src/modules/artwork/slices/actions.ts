import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/modules/store/store.js";
import {
  artworkApi,
  type ArtworkFindAllRequest,
  type ArtworkFindAllResponse,
  type ArtworkCreateRequest,
  type ArtworkCreateResponse,
  type ArtworkFindResponse,
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

const getById = createAsyncThunk<
  ArtworkFindResponse,
  { id: string },
  AsyncThunkConfig
>(`${sliceName}/getById`, async (payload) => {
  return await artworkApi.getById(payload);
});

export { loadAll, create, getById };
