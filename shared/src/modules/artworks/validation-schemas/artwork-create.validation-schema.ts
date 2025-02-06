import { z } from "zod";

import { type ArtworkCreateRequest } from "../types/types.js";
import { ARTWORK_TYPES } from "../enums/enums.js";

const artworkCreate: z.ZodType<ArtworkCreateRequest> = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(99, "Title cannot exceed 99 characters")
    .trim(),

  artist: z
    .string()
    .min(1, "Artist is required")
    .max(50, "Artist name cannot exceed 50 characters")
    .trim(),

  type: z.enum(ARTWORK_TYPES, {
    errorMap: () => ({
      message: `Type must be one of: ${ARTWORK_TYPES.join(", ")}`,
    }),
  }),

  price: z.coerce.number().positive("Price must be greater than 0").finite(),

  availability: z.boolean().optional(),
});

export { artworkCreate };
