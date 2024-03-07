/* eslint-disable @typescript-eslint/naming-convention -- Enum naming fixed by back-end */
import { z } from "zod";

export enum StatusEnum {
  unknown = "Unknown",
  alive = "Alive",
  dead = "Dead",
}

export enum SexEnum {
  female = "Female",
  male = "Male",
  undetermined = "Undetermined",
}

export enum LifeStageEnum {
  fledgling = "Fledgling",
  juvenile = "Juvenile",
  "sub-adult" = "Sub-Adult",
  adult = "Adult",
}

export const MediaSchema = z
  .object({
    thumbnail: z.string().url(),
    full_size: z.string().url(),
    large: z.string().url(),
  })
  .catch({
    thumbnail: "/placeholders/thumbnail.png",
    full_size: "/placeholders/large.png", // TODO one day replace this with a better placeholder
    large: "/placeholders/large.png",
  });

export const BirdExtendedSchema = z.object({
  description: z.string(),
  is_featured: z.boolean(),
  sponsor_name: z.string().nullable(),
  sponsor_website: z.string().url().nullable(),
  profile_picture: MediaSchema,
  profile_picture_attribution: z.string().nullable(),
});

export const BirdSchema = z.object({
  slug: z.string(),
  status: z.nativeEnum(StatusEnum),
  sex: z.nativeEnum(SexEnum),
  bird_extended: BirdExtendedSchema.nullable(),
  get_age: z.number().nullable(),
  get_life_stage: z.nativeEnum(LifeStageEnum).nullable(),
  study_area: z.string(),
  band_combo: z.string().nullable(),
  gid: z.string().nullable(),
  name: z.string(),
  birthday: z.coerce.date(),
  primary_band: z.string().nullable(),
  date_modified: z.coerce.date(),
  date_imported: z.coerce.date(),
});
