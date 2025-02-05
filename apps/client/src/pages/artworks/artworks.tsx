import { Button } from "~/libs/components/components.js";

import { ArtworkCard } from "./libs/components/components.js";
import { useArtworkPage } from "./artworks-page.hook.js";

import styles from "./styles.module.css";

const ArtworksPage: React.FC = () => {
  const { artworks, onOpenNewArtworkModal, onOpenArtworkDetailsModal } =
    useArtworkPage();

  return (
    <>
      <div className={styles["top"]}>
        <h1 className={styles["title"]}>Explore Our Collection</h1>

        <div className={styles["button-wrapper"]}>
          <Button
            label="Add New Artwork"
            onClick={() => {
              onOpenNewArtworkModal();
            }}
          />
        </div>
      </div>

      <div className={styles["artworks-list"]}>
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            {...artwork}
            onClick={(id) => {
              onOpenArtworkDetailsModal(id);
            }}
          />
        ))}
      </div>
    </>
  );
};

export { ArtworksPage };
