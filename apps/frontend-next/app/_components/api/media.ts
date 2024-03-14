import { type Media, MediaSchema } from "./schema";

export const getMediaOrPlaceholder = (media?: Media) =>
  MediaSchema.parse(media);
