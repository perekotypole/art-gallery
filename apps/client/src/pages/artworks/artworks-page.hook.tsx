import { useCallback, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { type Control, type FieldErrors, useForm } from "react-hook-form";

import {
  type ArtworkFindAllRequest,
  type ArtworkFindAllResponse,
} from "~/modules/artwork/artwork.js";
import { useModal } from "~/libs/contexts/modal/modal.js";

import { ArtworkDetails, CreateArtwork } from "./libs/modals/modals.js";

const mockArtworks: ArtworkFindAllResponse = [
  {
    id: "7be5ce0e-4879-48fd-a2c2-be2e49603609",
    title: "First artwork",
    artist: "First artist",
    type: "painting",
    price: 100000,
  },
];

type FormData = ArtworkFindAllRequest;

type ReturnData = {
  artworks: ArtworkFindAllResponse;
  onOpenNewArtworkModal: () => void;
  onOpenArtworkDetailsModal: (id: string) => void;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
};

const useArtworkPage = (): ReturnData => {
  const { onOpenModal } = useModal();

  const navigate = useNavigate();

  const newArtworkMatch = useMatch("/new");
  const artworkDetailsMatch = useMatch("/details/:artworkId");

  const onOpenNewArtworkModal = useCallback(() => {
    void navigate("/new");
  }, [navigate]);

  const onOpenArtworkDetailsModal = useCallback(
    (id: string) => {
      void navigate(`/details/${id}`);
    },
    [navigate],
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (newArtworkMatch) {
      onOpenModal(<CreateArtwork />, "/");
    }
  }, [newArtworkMatch]);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (artworkDetailsMatch) {
      onOpenModal(<ArtworkDetails />, "/");
    }
  }, [artworkDetailsMatch]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const {
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      artist: "",
    },
    mode: "onChange",
  });

  return {
    artworks: mockArtworks,
    onOpenNewArtworkModal,
    onOpenArtworkDetailsModal,
    control,
    errors,
  };
};

export { useArtworkPage };
