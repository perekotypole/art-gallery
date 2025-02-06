import { Button, Input, Select } from "~/libs/components/components.js";
import { ArtworkType, ARTWORK_TYPES } from "~/modules/artwork/artwork.js";

import { ArtworkCard } from "./libs/components/components.js";
import { useArtworkPage } from "./artworks-page.hook.js";

import styles from "./styles.module.css";

const ArtworksPage: React.FC = () => {
  const {
    artworks,
    onOpenNewArtworkModal,
    onOpenArtworkDetailsModal,
    control,
    errors,
  } = useArtworkPage();

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

      <form className={styles["filter-form"]}>
        <div className={styles["search-wrapper"]}>
          <Input
            name="search"
            control={control}
            errors={errors}
            label="Search"
            placeholder="Search..."
            isLabelHidden
          />
        </div>

        <div className={styles["artist-filter-wrapper"]}>
          <Input
            name="artist"
            control={control}
            errors={errors}
            label="Artist search"
            placeholder="Artist search..."
            isLabelHidden
          />
        </div>

        <Select
          name="type"
          control={control}
          label="Artwork type"
          placeholder="Artwork type"
          isClearable
          isLabelHidden
          options={ARTWORK_TYPES.map((type) => ({
            value: type,
            label: ArtworkType[type],
          }))}
        />

        <Select
          name="price"
          control={control}
          label="Sort by price"
          placeholder="Sort"
          isClearable
          isLabelHidden
          options={[
            { value: "asc", label: "Lowest prices" },
            { value: "desc", label: "Highest prices" },
          ]}
        />
      </form>

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
