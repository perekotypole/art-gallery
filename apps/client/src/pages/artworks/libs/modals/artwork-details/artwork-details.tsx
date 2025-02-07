import { ArtworkType } from "~/modules/artwork/artwork.js";

import { useArtworkDetails } from "./artwork-details.hook.js";
import styles from "./styles.module.css";
import { Button } from "~/libs/components/components.js";

const ArtworkDetails: React.FC = () => {
  const { artwork, handleDelete } = useArtworkDetails();

  if (!artwork) {
    return <></>;
  }
  const isNotAvailable = typeof artwork.availability !== "boolean";

  return (
    <div className={styles["details"]}>
      <img
        className={styles["details-image"]}
        src="https://picsum.photos/400/600?grayscale"
        alt={`${artwork.title}: ${ArtworkType[artwork.type]} by ${artwork.artist}`}
        loading="lazy"
      />

      <div className={styles["details-info"]}>
        <div className={styles["main-info-wrapper"]}>
          <p>{artwork.title}</p>
          <p>${artwork.price}</p>
        </div>

        <div className={styles["description-wrapper"]}>
          <p>
            <b>Type:</b> {ArtworkType[artwork.type]}
          </p>
          <p>
            <b>Artist:</b> {artwork.artist}
          </p>
          <p>
            <b>Availability:</b>{" "}
            {isNotAvailable
              ? "Not available"
              : artwork.availability
                ? "For sale"
                : "For exhibition"}
          </p>
          <p>
            <b>ID:</b> {artwork.id}
          </p>
          <p>
            <b>Created:</b> {artwork.created_at}
          </p>
          <p>
            <b>Updated:</b> {artwork.updated_at}
          </p>
        </div>
      </div>

      <div className={styles["delete-button-wrapper"]}>
        <Button label="Delete" onClick={handleDelete} />
      </div>
    </div>
  );
};

export { ArtworkDetails };
