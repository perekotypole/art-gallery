import { z } from "zod";

import { type ArtworkCreateRequest } from "../types/types.js";
import { ARTWORK_TYPES } from "../enums/enums.js";

const artworkCreate: z.ZodType<ArtworkCreateRequest> = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(99, "Title cannot exceed 99 characters"),

    artist: z
      .string()
      .min(1, "Artist is required")
      .max(50, "Artist name cannot exceed 50 characters"),

    type: z
      .enum(ARTWORK_TYPES)
      .refine((value) => ARTWORK_TYPES.includes(value), {
        message: `Type must be either ${ARTWORK_TYPES.join(" or ")}`,
      }),

    price: z.number().gt(0, "Price must be greater than 0"),

    availability: z.boolean().optional(),
  })
  .required();

export { artworkCreate };
