/* eslint-disable @typescript-eslint/no-magic-numbers -- defining constant sizes here */
import { type Media, MediaSchema } from "./schema";

export const IMAGE_SIZES = {
  thumbnail: { width: 350, height: 250 },
  large: { width: 500, height: 500 },
};

export const getMediaOrPlaceholder = (media?: Media) =>
  MediaSchema.parse(media);
