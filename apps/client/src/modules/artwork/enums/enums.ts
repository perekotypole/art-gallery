import { type ARTWORK_TYPES } from "@art-gallery/shared";

const ArtworkType: Record<(typeof ARTWORK_TYPES)[number], string> = {
  painting: "Painting",
  sculpture: "Sculpture",
};

export { ArtworkType, ARTWORK_TYPES };
