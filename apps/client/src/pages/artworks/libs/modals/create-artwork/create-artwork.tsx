import { Button, Input, Select } from "~/libs/components/components.js";
import { ARTWORK_TYPES, ArtworkType } from "~/modules/artwork/artwork.js";

import { useCreateArtwork } from "./create-artwork.hook.js";
import styles from "./styles.module.css";

const CreateArtwork: React.FC = () => {
  const { control, errors, handleFormSubmit } = useCreateArtwork();

  return (
    <form className={styles["create-form"]} onSubmit={handleFormSubmit}>
      <Input
        name="title"
        control={control}
        errors={errors}
        label="Title"
        placeholder="Title"
      />

      <Input
        name="artist"
        control={control}
        errors={errors}
        label="Artist"
        placeholder="Artist"
      />

      <Select
        name="type"
        control={control}
        label="Type"
        placeholder="Type"
        options={ARTWORK_TYPES.map((type) => ({
          value: type,
          label: ArtworkType[type],
        }))}
      />

      <Input
        name="price"
        control={control}
        errors={errors}
        type="number"
        label="Price"
        placeholder="Price"
      />

      <Button label="Save" type="submit" />
    </form>
  );
};

export { CreateArtwork };
