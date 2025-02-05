import { type ARTWORK_TYPES } from "../enums/enums.js";

type ArtworkCreateRequest = {
  title: string;
  artist: string;
  type: (typeof ARTWORK_TYPES)[number];
  price: number;
  availability?: boolean | undefined;
};

type ArtworkUpdateRequest = {
  title: string;
  artist: string;
  type: (typeof ARTWORK_TYPES)[number];
  price: number;
  availability?: boolean | undefined;
};

type ArtworkFindAllRequest = {
  price?: "asc" | "desc";
  title?: string;
  artist?: string;
  type?: (typeof ARTWORK_TYPES)[number];
};

export type {
  ArtworkCreateRequest,
  ArtworkUpdateRequest,
  ArtworkFindAllRequest,
};
