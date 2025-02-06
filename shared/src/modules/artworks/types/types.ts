import { type ARTWORK_TYPES } from "../enums/enums.js";

type ArtworkFindResponse = {
  id: string;
  title: string;
  artist: string;
  type: (typeof ARTWORK_TYPES)[number];
  price: number;
  availability: boolean;
  created_at: string;
  updated_at: string;
};

type ArtworkFindAllRequest = {
  price?: "asc" | "desc";
  title?: string;
  artist?: string;
  type?: (typeof ARTWORK_TYPES)[number];
};

type ArtworkFindAllResponse = Array<
  Pick<
    ArtworkFindResponse,
    "id" | "title" | "artist" | "price" | "type" | "availability"
  >
>;

type ArtworkCreateRequest = {
  title: string;
  artist: string;
  type: (typeof ARTWORK_TYPES)[number];
  price: number;
  availability?: boolean | undefined;
};

type ArtworkCreateResponse = ArtworkFindResponse;

type ArtworkUpdateRequest = {
  title: string;
  artist: string;
  type: (typeof ARTWORK_TYPES)[number];
  price: number;
  availability?: boolean | undefined;
};

type ArtworkUpdateResponse = ArtworkFindResponse | null;

type ArtworkDeleteResponse = { deleted: boolean };

export type {
  ArtworkFindResponse,
  ArtworkFindAllRequest,
  ArtworkFindAllResponse,
  ArtworkCreateRequest,
  ArtworkCreateResponse,
  ArtworkUpdateRequest,
  ArtworkUpdateResponse,
  ArtworkDeleteResponse,
};
