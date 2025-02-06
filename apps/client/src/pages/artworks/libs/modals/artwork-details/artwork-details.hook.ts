import { type ArtworkFindResponse } from "~/modules/artwork/artwork.js";

const mockArtwork: ArtworkFindResponse = {
  id: "7be5ce0e-4879-48fd-a2c2-be2e49603609",
  title: "First artwork",
  artist: "First artist",
  type: "painting",
  price: 100000,
  availability: false,
  created_at: "2025-02-05T13:51:58.217Z",
  updated_at: "2025-02-05T13:51:58.217Z",
};

type ReturnData = {
  artwork: ArtworkFindResponse;
};

const useArtworkDetails = (): ReturnData => {
  return {
    artwork: mockArtwork,
  };
};

export { useArtworkDetails };
