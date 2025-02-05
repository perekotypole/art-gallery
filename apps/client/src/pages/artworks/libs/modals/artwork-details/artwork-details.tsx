import { ArtworkType } from "~/modules/artwork/artwork.js";

import { useArtworkDetails } from "./artwork-details.hook.js";
import styles from "./styles.module.css";

const ArtworkDetails: React.FC = () => {
  const {
    artwork: {
      title,
      artist,
      type,
      price,
      availability,
      created_at,
      updated_at,
      id,
    },
  } = useArtworkDetails();

  return (
    <div className={styles["details"]}>
      <img
        className={styles["details-image"]}
        src="https://picsum.photos/200/300?grayscale"
        alt={`${title}: ${ArtworkType[type]} by ${artist}`}
        loading="lazy"
      />

      <div className={styles["details-info"]}>
        <div className={styles["main-info-wrapper"]}>
          <p>{title}</p>
          <p>${price}</p>
        </div>

        <div className={styles["description-wrapper"]}>
          <p>
            <b>Type:</b> {ArtworkType[type]}
          </p>
          <p>
            <b>Artist:</b> {artist}
          </p>
          <p>
            <b>Availability:</b> {availability.toString()}
          </p>
          <p>
            <b>ID:</b> {id}
          </p>
          <p>
            <b>Created:</b> {created_at}
          </p>
          <p>
            <b>Updated:</b> {updated_at}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ArtworkDetails };
