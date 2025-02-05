import { type ArtworkFindAllResponse } from "~/modules/artwork/artwork.js";

import { ArtworkCard } from "./libs/components/components.js";

import styles from "./styles.module.css";

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

const ArtworksPage: React.FC = () => {
  return (
    <>
      <h1 className={styles["title"]}>Explore Our Collection</h1>

      <div className={styles["artworks-list"]}>
        {mockingArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} {...artwork} />
        ))}
      </div>
    </>
  );
};

export { ArtworksPage };
