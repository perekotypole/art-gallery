import {
  ArtworkType,
  type ArtworkFindAllResponse,
} from "~/modules/artwork/artwork.js";

import styles from "./styles.module.css";
import clsx from "clsx";

type Props = ArtworkFindAllResponse[number] & {
  onClick: (id: string) => void;
};

const ArtworkCard: React.FC<Props> = ({
  id,
  title,
  artist,
  type,
  price,
  availability,
  onClick,
}) => {
  const isNotAvailable = typeof availability !== "boolean";

  return (
    <div
      className={clsx(
        styles["card"],
        !isNotAvailable && availability && styles["card-sale"],
        !isNotAvailable && !availability && styles["card-exhibition"],
      )}
      onClick={() => {
        onClick(id);
      }}
    >
      <img
        className={styles["card-image"]}
        src="https://picsum.photos/400/600?grayscale"
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
