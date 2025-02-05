import {
  ArtworkType,
  type ArtworkFindAllResponse,
} from "~/modules/artwork/artwork.js";

import styles from "./styles.module.css";

type Props = ArtworkFindAllResponse[number];

const ArtworkCard: React.FC<Props> = ({ title, artist, type, price }) => {
  return (
    <div className={styles["card"]}>
      <img
        className={styles["card-image"]}
        src="https://placehold.co/600x400"
        alt={`${title}: ${ArtworkType[type]} by ${artist}`}
        loading="lazy"
      />

      <div className={styles["card-info"]}>
        <div className={styles["main-info-wrapper"]}>
          <p>{title}</p>
          <p>${price}</p>
        </div>

        <div className={styles["details-wrapper"]}>
          <p>
            {ArtworkType[type]} by {artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ArtworkCard };
