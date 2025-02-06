import { useCallback, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import {
  type Control,
  type FieldErrors,
  useForm,
  useWatch,
} from "react-hook-form";

import {
  type ArtworkFindAllRequest,
  type ArtworkFindAllResponse,
  actions as artworkActions,
} from "~/modules/artwork/artwork.js";
import { useModal } from "~/libs/contexts/modal/modal.js";
import { useAppSelector, useAppDispatch } from "~/libs/hooks/hooks.js";

import { ArtworkDetails, CreateArtwork } from "./libs/modals/modals.js";

type FormData = ArtworkFindAllRequest;

type ReturnData = {
  artworks: ArtworkFindAllResponse;
  onOpenNewArtworkModal: () => void;
  onOpenArtworkDetailsModal: (id: string) => void;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
};

const useArtworkPage = (): ReturnData => {
  const dispatch = useAppDispatch();
  const { artworks } = useAppSelector(({ artwork }) => artwork);

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

  const params = useWatch({ control });

  useEffect(() => {
    void dispatch(artworkActions.loadAll(params));
  }, [params]);

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

  return {
    artworks,
    onOpenNewArtworkModal,
    onOpenArtworkDetailsModal,
    control,
    errors,
  };
};

export { useArtworkPage };
