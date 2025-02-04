import { ARTWORK_TYPES } from "../enums/enums.js";

type ArtworkCreateRequest = {
  title: string;
  artist: string;
  type: (typeof ARTWORK_TYPES)[number];
  price: number;
  availability?: boolean;
};

export type { ArtworkCreateRequest };
