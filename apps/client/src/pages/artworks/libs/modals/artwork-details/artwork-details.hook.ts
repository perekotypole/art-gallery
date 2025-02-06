import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
  type ArtworkFindResponse,
  actions as artworkActions,
} from "~/modules/artwork/artwork.js";

type ReturnData = {
  artwork: ArtworkFindResponse | null;
};

const useArtworkDetails = (): ReturnData => {
  const { artworkId } = useParams();

  const dispatch = useAppDispatch();
  const { artwork } = useAppSelector(({ artwork }) => artwork);

  useEffect(() => {
    if (artworkId) {
      void dispatch(artworkActions.getById({ id: artworkId }));
    }
  }, [dispatch, artworkId]);

  return {
    artwork,
  };
};

export { useArtworkDetails };
