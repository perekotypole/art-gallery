import { useCallback, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";

import { type ArtworkFindAllResponse } from "~/modules/artwork/artwork.js";
import { useModal } from "~/libs/contexts/modal/modal.js";

import { CreateArtwork } from "./libs/modals/modals.js";

const mockingArtworks: ArtworkFindAllResponse = [
  {
    id: "7be5ce0e-4879-48fd-a2c2-be2e49603609",
    title: "First artwork",
    artist: "First artist",
    type: "painting",
    price: 100000,
    availability: false,
    created_at: "2025-02-05T13:51:58.217Z",
    updated_at: "2025-02-05T13:51:58.217Z",
  },
];

type ReturnData = {
  artworks: ArtworkFindAllResponse;
  onOpenNewArtworkModal: () => void;
};

const useArtworkPage = (): ReturnData => {
  const { onOpenModal } = useModal();

  const navigate = useNavigate();

  const newArtworkMatch = useMatch("/new");

  const onOpenNewArtworkModal = useCallback(() => {
    void navigate("/new");
  }, [navigate]);

  useEffect(() => {
    if (newArtworkMatch) {
      onOpenModal(<CreateArtwork />, "/");
    }
  }, [newArtworkMatch, navigate, onOpenModal]);

  return {
    artworks: mockingArtworks,
    onOpenNewArtworkModal,
  };
};

export { useArtworkPage };
