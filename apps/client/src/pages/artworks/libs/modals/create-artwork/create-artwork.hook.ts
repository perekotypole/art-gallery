import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type SubmitHandler,
  type Control,
  type FieldErrors,
} from "react-hook-form";

import {
  ARTWORK_TYPES,
  artworkCreateValidationSchema,
} from "~/modules/artwork/artwork.js";

type FormData = z.infer<typeof artworkCreateValidationSchema>;

type ReturnData = {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  handleFormSubmit: (e: React.BaseSyntheticEvent) => void;
};

const useCreateArtwork = (): ReturnData => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(artworkCreateValidationSchema),
    defaultValues: {
      title: "",
      artist: "",
      type: ARTWORK_TYPES[0],
      price: 0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data): void => {
    console.log(data);
  };

  const handleFormSubmit = (e: React.BaseSyntheticEvent): void => {
    void handleSubmit(onSubmit)(e);
  };

  return {
    control,
    errors,
    handleFormSubmit,
  };
};

export { useCreateArtwork };
