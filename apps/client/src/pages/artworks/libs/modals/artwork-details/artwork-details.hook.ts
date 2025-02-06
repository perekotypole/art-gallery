import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useModal } from "~/libs/contexts/modal/modal.hook.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
  type ArtworkFindResponse,
  actions as artworkActions,
} from "~/modules/artwork/artwork.js";

type ReturnData = {
  artwork: ArtworkFindResponse | null;
  handleDelete: () => void;
};

const useArtworkDetails = (): ReturnData => {
  const { artworkId } = useParams();
  const { onCloseModal } = useModal();

  const dispatch = useAppDispatch();
  const { artwork } = useAppSelector(({ artwork }) => artwork);

  useEffect(() => {
    if (artworkId) {
      void dispatch(artworkActions.getById({ id: artworkId }));
    }
  }, [dispatch, artworkId]);

  const handleDelete = useCallback(() => {
    if (artworkId) {
      void dispatch(artworkActions.deleteById({ id: artworkId }));
      onCloseModal();
    }
  }, [artworkId, dispatch, onCloseModal]);

  return {
    artwork,
    handleDelete,
  };
};

export { useArtworkDetails };
